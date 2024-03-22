require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_LOCAL;
const dbName = args[1] ?? "projet_RS";

const Message  = {

  addMessage : async function(conversationIdStr, userIdStr, name_user, content, date_envoi) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    let userId = new ObjectId(userIdStr);
    let conversationId = new ObjectId(conversationIdStr)
    messagesCollection.insertOne({
      id_conversation: conversationId,
      id_user: userId,
      name_user: name_user,
      contenu: content,
      date_envoi: date_envoi
    })
      .then(
        () => {
          console.log(`[Message] Message created`);
        }
      );
  },

  getAll : async function()  {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[Message] Connected successfully to MongoDB server: ${url}`);

      const db = client.db(dbName);
      const messagesCollection = db.collection('messages');

      const messages = await messagesCollection.find().toArray();

      return await Promise.all(messages.map(async message => {
        return {
          _id: message._id.toString(),
          id_conversation: message.id_conversation,
          id_user: message.id_user,
          name_user: message.name_user,
          contenu: message.contenu,
          date_envoi: message.date_envoi
        };
      }));
    }
    finally {
      await client.close();
      console.log('[Message] Connection to MongoDB closed.');
    }
  },

  getById : async function(messageId) {

    return this.getAll()
      .then(messages => {
        return messages.find(message => message._id === messageId);
      });
  },

  getByUser : async function(userId) {

    return this.getAll()
      .then(messages => {
        return messages.filter(message => message.id_user === userId);
      });
  },

  getByConversation : async function(conversationIdStr) {
    return this.getAll()
      .then(messages => {
        return messages.filter(message => message.id_conversation.toString() === conversationIdStr);
      });
  },

  getLastMessageByConversation: async function(conversationIdStr) {
    const messages = await this.getByConversation(conversationIdStr);

    // Trier les messages par date_envoi dans l'ordre décroissant
    const sortedMessages = messages.sort((a, b) => {
      const dateA = this.convertStringToDate(a.date_envoi);
      const dateB = this.convertStringToDate(b.date_envoi);

      if (dateA > dateB) return -1; // -1 pour trier dans l'ordre décroissant
      if (dateA < dateB) return 1;
      return 0;
    });

    return sortedMessages[0] || null;
  },

  convertStringToDate: function(dateString) {
    const [datePart, timePart] = dateString.split(':');
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split('-');
    return new Date(year, month - 1, day, hour, minute, second);
  },

  deleteById : async function(messageIdStr) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    let messageId = new ObjectId(messageIdStr);
    await messagesCollection.deleteOne({_id: messageId});
  },
}

module.exports = Message;
