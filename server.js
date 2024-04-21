const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

const connectionStringURI = `mongoose.connect('mongodb://127.0.0.1:27017/friendsdb');`;
const client = new MongoClient(connectionStringURI);
// let db;

// const dbName = 'friendsdb';

// const db = require('./config/connection');
const db = require('./config/connection');

db.once('open', () => {
 app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
 });
});

// async function seedDBAndStartServer() {
//   try {
//     await client.connect();
//     console.log('Connected to the database');
//     db = client.db(dbName);
//     await db.collection('users').deleteMany({});
//     await db.collection('users').insertMany(data);

//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message);
//   }
// }
// seedDBAndStartServer();

app.use(express.json());
app.use(routes);

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
});


