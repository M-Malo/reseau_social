require('dotenv').config();
const { MongoClient, ObjectId} = require('mongodb');
const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "projet_RS";


const User = {

  addUser : async function(nom_utilisateur, nom, prenom, mail, admin, image, date_naissance, mdp) {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[User] Connected successfully to MongoDB server: ${url}`);
      const db = client.db(dbName);

      const usersCollection = db.collection('users');
      await usersCollection.insertOne({
        nom_utilisateur : nom_utilisateur,
        nom : nom,
        prenom : prenom,
        mail : mail,
        admin : admin,
        image : image,
        date_naissance : date_naissance,
        mdp : mdp
      })
        .then(
          () => {
            console.log(`[User] User '${nom_utilisateur}' created`);
          }
        );
    }
    finally {
      await client.close();
      console.log('[User] Connection to MongoDB closed.');
    }
  },

  getAll : async function()  {

    const client = new MongoClient(url);
    try {
      await client.connect();
      console.log(`[User] Connected successfully to MongoDB server: ${url}`);

      const db = client.db(dbName);
      const usersCollection = db.collection('users');

      const users = await usersCollection.find().toArray();

      return await Promise.all(users.map(async user => {
        return {
          _id: user._id.toString(),
          nom_utilisateur: user.nom_utilisateur,
          nom: user.nom,
          prenom: user.prenom,
          admin: user.admin,
          image: user.image,
          date_naissance: user.date_naissance,
          mdp: user.mdp
        };
      }));
    }
    finally {
      await client.close();
      console.log('[User] Connection to MongoDB closed.');
    }
  },

  getById : async function(userId){

    return this.getAll().then(users => {
      return users.find( user => user._id === userId );
    });
  },

  deleteById : async function(userIdStr) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    let userId = new ObjectId(userIdStr);
    await usersCollection.deleteOne({_id: userId});
  },

  updateById : async function(userIdStr, nom_utilisateur, nom, prenom, mail, admin, image, date_naissance) {

    const client = new MongoClient(url);
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    let userId = new ObjectId(userIdStr);
    await usersCollection.updateOne({_id: userId}, {$set:{
        nom_utilisateur: nom_utilisateur,
        nom: nom,
        prenom: prenom,
        mail: mail,
        admin: admin,
        image: image,
        date_naissance: date_naissance
    }});
  },

  validateEmail : function (mail){
    let pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;

    if (pattern.test(mail))
    {
      console.log('La saisie est une adresse email valide ');
    }
    else
    {
      //console.warn("L'adresse mail saisie est invalide !");
      throw "L'adresse mail saisie est invalide !";
    }
  }

}

module.exports = User;
