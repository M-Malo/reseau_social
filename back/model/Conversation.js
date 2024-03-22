require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? "projet_RS";


const Conversation = {

  addConversation : async function(idUser1Str, idUser2Str) {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[Conversation] Connected successfully to MongoDB server: ${url}`);
      const db = client.db(dbName);

      const conversationsCollection = db.collection('conversations');
      await conversationsCollection.insertOne({
        id_user1 : new ObjectId(idUser1Str),
        id_user2 : new ObjectId(idUser2Str)
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
          id_user1: conversation.id_user1.toString(),
          id_user2: conversation.id_user2.toString()
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
