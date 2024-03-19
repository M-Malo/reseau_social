require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "projet_RS";


const Conversation = {

  addConversation : async function(idUser1, idUser2) {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[Conversation] Connected successfully to MongoDB server: ${url}`);
      const db = client.db(dbName);

      const conversationsCollection = db.collection('conversations');
      await conversationsCollection.insertOne({
        id_user1 : idUser1,
        id_user2 : idUser2
      })
        .then(
          () => {
            console.log(`[Conversation] Conversation created`);
          }
        );
    }
    finally {
      await client.close();
      console.log('[Conversation] Connection to MongoDB closed.');
    }
  },

  getAll : async function()  {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[Conversation] Connected successfully to MongoDB server: ${url}`);

      const db = client.db(dbName);
      const conversationsCollection = db.collection('conversations');

      const conversations = await conversationsCollection.find().toArray();

      return await Promise.all(conversations.map(async conversation => {
        return {
          _id: conversation._id.toString(),
          id_user1: conversation.id_user1,
          id_user2: conversation.id_user2
        };
      }));
    }
    finally {
      await client.close();
      console.log('[Conversation] Connection to MongoDB closed.');
    }
  },

  getById : async function(conversationId){

    return this.getAll().then(conversations => {
      return conversations.find( conversation => conversation._id === conversationId );
    });
  },

  getByUser : async function(userId){

    return this.getAll().then(conversations => {
      return conversations.filter( conversation => conversation.id_user1 === userId || conversation.id_user2 === userId );
    });
  },

  deleteById : async function(conversationIdStr) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const conversationsCollection = db.collection('conversations');

    let conversationId = new ObjectId(conversationIdStr);
    await conversationsCollection.deleteOne({_id: conversationId});
  },


}

module.exports = Conversation;
