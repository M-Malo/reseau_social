require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? "projet_RS";

const Message  = {

  addMessage : async function(conversationIdStr, userIdStr, content, date_envoi) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const messagesCollection = db.collection('messages');

    let userId = new ObjectId(userIdStr);
    let conversationId = new ObjectId(conversationIdStr)
    messagesCollection.insertOne({
      id_conversation: conversationId,
      id_user: userId,
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
    console.log("debut getByConversation");
    console.log(conversationIdStr);
    return this.getAll()
      .then(messages => {
        return messages.filter(message => message.id_conversation.toString() === conversationIdStr);
      });
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
