require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? "projet_RS";


const Favori = {

  addFavori : async function(idEventStr, idUserStr) {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[Conversation] Connected successfully to MongoDB server: ${url}`);
      const db = client.db(dbName);

      const favorisCollection = db.collection('favoris');
      await favorisCollection.insertOne({
        id_event : new ObjectId(idEventStr),
        id_user : new ObjectId(idUserStr)
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
      const favorisCollection = db.collection('favoris');

      const favoris = await favorisCollection.find().toArray();

      return await Promise.all(favoris.map(async favori => {
        return {
          _id: favori._id.toString(),
          id_event: favori.id_event.toString(),
          id_user: favori.id_user.toString()
        };
      }));
    }
    finally {
      await client.close();
      console.log('[Conversation] Connection to MongoDB closed.');
    }
  },

  getById : async function(favoriId){

    return this.getAll().then(favoris => {
      return favoris.find( favori => favori._id === favoriId );
    });
  },

  getByUser : async function(userId){

    return this.getAll().then(favoris => {
      return favoris.filter( favori => favori.id_user === userId );
    });
  },

  getByEvent : async function(eventId){

    return this.getAll().then(favoris => {
      return favoris.filter( favori => favori.id_event === eventId );
    });
  },

  deleteById : async function(conversationIdStr) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const favorisCollection = db.collection('favoris');

    let conversationId = new ObjectId(conversationIdStr);
    await favorisCollection.deleteOne({_id: conversationId});
  },
}

module.exports = Favori;
