const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { User, Thought } = require('../models');

const { MongoClient, ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3001;
const app = express();

const connectionStringURI = 'mongodb://localhost:27017';

const client = new MongoClient(connectionStringURI);

let db;

const dbName = 'friendsdb';

client.connect()
  .then(() => {
    console.log('Connected to the database');
    db = client.db(dbName);

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database', err.message);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.post('/create', (req, res) => {
  db.collection('friends').insertOne(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

app.post('/create-many', (req, res) => {
  db.collection('friends').insertMany(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

app.get('/read', (req, res) => {
  db.collection('friends').find({})
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });

app.delete('/delete', (req, res) => {
  db.collection('friends').deleteOne({ _id: ObjectId(req.body.id) })
    .then((result) => {
      console.log(results);
      res.send
      (results.deletedCount > 0 ? 'Success' : 'No match found');
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

db.once('open', () => {
  app.listen(PORT, () => {
   console.log(`API server running on port ${PORT}!`);
  }); // Add a comma here
});
});

