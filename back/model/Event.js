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
      theme: Number(theme),
      image: image,
      prix: Number(prix),
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

  getByFiltre: async function (priceMax, eventName, eventTheme) {

    // Filtrage des événements en fonction des critères
    return this.getAll() .then(
      events => {
        return events.filter(event => {
          // Filtrer par prix maximal si le prix maximum est défini
          if (priceMax && event.prix > priceMax) {
            return false;
          }
          // Filtrer par nom d'événement si le nom est défini
          if (eventName && event.nom.toString() !== eventName) {
            return false;
          }
          // Filtrer par thème d'événement si le thème est défini
          if (eventTheme && event.theme !== eventTheme) {
            return false;
          }
          return true;
    })});
  },

  getByName : async function(eventName) {

    return this.getAll()
      .then(events => {
        return events.filter(event => event.name === eventName);
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

  sortByPrice: async function(conversationIdStr) {
    return this.getAll().sort((a, b) => {
      if (a > b) return -1; // -1 pour trier dans l'ordre décroissant
      if (a < b) return 1;
      return 0;
    });
  },

  sortByDate: async function(conversationIdStr) {
    return this.getAll().sort((a, b) => {
      const dateA = this.convertStringToDate(a.date_envoi);
      const dateB = this.convertStringToDate(b.date_envoi);

      if (dateA > dateB) return -1; // -1 pour trier dans l'ordre décroissant
      if (dateA < dateB) return 1;
      return 0;
    });
  },

  convertStringToDate: function(dateString) {
    const [datePart, timePart] = dateString.split(':');
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split('-');
    return new Date(year, month - 1, day, hour, minute, second);
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
          theme : Number(theme),
          image : image,
          prix : Number(prix),
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
