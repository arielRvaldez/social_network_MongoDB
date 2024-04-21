const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI);
// let db;

const dbName = 'friendsdb';

client.connect()
  .then (() => {
    console.log('Connected to the database');
    const db = client.db(dbName);

   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());
   app.use(routes);
  
  })
  .catch((err) => {
    console.error(err);
  });

app.post('/create', (req, res) => {
  db.collection('users').insertOne(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

app.post('/create-many', (req, res) => {
  db.collection('users').insertMany(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

app.get('/read', (req, res) => {
  db.collection('users').find({})
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });

app.delete('/delete', (req, res) => {
  db.collection('users').deleteOne({ _id: ObjectId(req.body.id) })
    .then((result) => {
      console.log(results);
      res.send
      (result.deletedCount > 0 ? 'Success' : 'No match found');
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
});


