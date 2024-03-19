require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? "projet_RS";

const Event  = {

  addEvent : async function(userIdStr, nom, theme, image, prix, date, description) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const eventsCollection = db.collection('events');

    let userId = new ObjectId(userIdStr);
    eventsCollection.insertOne({
      id_organisateur: userId,
      nom: nom,
      theme: theme,
      image: image,
      prix: prix,
      date_event: date,
      description: description
    })
      .then(
        () => {
          console.log(`[Events] Event '${nom}' created`);
        }
      );
  },

  getAll : async function()  {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[Events] Connected successfully to MongoDB server: ${url}`);

      const db = client.db(dbName);
      const eventsCollection = db.collection('events');

      const events = await eventsCollection.find().toArray();

      return await Promise.all(events.map(async event => {
        return {
          _id: event._id.toString(),
          id_organisateur: event.id_organisateur.toString(),
          nom: event.nom,
          theme: event.theme,
          image: event.image,
          prix: event.prix,
          date_event : event.date_event,
          description: event.description,
        };
      }));
    }
    finally {
      await client.close();
      console.log('[Events] Connection to MongoDB closed.');
    }
  },

  getById : async function(eventId) {

    return this.getAll()
      .then(events => {
        return events.find(event => event._id === eventId);
      });
  },


  getByName : async function(eventName) {

    return this.getAll()
      .then(events => {
        return events.filter(event => event.name === eventName);
      });
  },

  getByPriceMax : async function(priceMax) {

    return this.getAll()
      .then(events => {
        return events.filter(event => event.price <= priceMax);
      });
  },

  getByPriceMin : async function(priceMin) {

    return this.getAll()
      .then(events => {
        return events.filter(event => event.price >= priceMin);
      });
  },

  getByTheme : async function(eventTheme) {

    return this.getAll()
      .then(events => {
        return events.filter(event => event.theme === eventTheme);
      });
  },

  getByUser : async function(userId) {

    return this.getAll()
      .then(events => {
        return events.filter(event => event.id_organisateur === userId);
      });
  },

  deleteById : async function(eventIdStr) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const eventsCollection = db.collection('events');

    let eventId = new ObjectId(eventIdStr);
    await eventsCollection.deleteOne({_id: eventId});
  },

  sortByPrice : async function() {
    return this.getAll().sort({price: -1});
  },

  sortByDate : async function() {
    return this.getAll().sort({date_event: -1});
  },

  updateById : async function(eventIdStr, userIdStr, nom, theme, image, prix, date, description) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const eventCollection = db.collection('events');

    let userId = new ObjectId(userIdStr);
    let eventId = new ObjectId(eventIdStr);
    await eventCollection.updateOne({_id: eventId}, {$set:
        {
          id_organisateur : userId,
          nom : nom,
          theme : theme,
          image : image,
          prix : prix,
          date_event : date,
          description : description,
        }})
      .then(
        () => {
          console.log(`[Events] Event '${nom}' updated`);
        }
      );
  }

}

module.exports = Event;
