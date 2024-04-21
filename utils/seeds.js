const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const { getRandomUsername, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usernamesCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usernamesCheck.length) {
      await connection.dropCollection('users');
    }


// Create empty array to hold the users
const users = [];
// Get some random assignment objects using a helper function that we imported from ./data
const thoughts = getRandomThoughts(10);
// Loop 20 times -- add students to the users array
for (let i = 0; i < 20; i++) {
    

const fullName = getRandomUsername();
    
// const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

users.push({
  fullName,
    //   github,
  thoughts,
 });
}

// Add users to the collection and await the results
await User.collection.insertMany(users);
await Thought.collection.insertMany(thoughts);

  // Add thoughts to the collection and await the results
  // await Cours.insertOne({
  // const thoughts = await Thought.insertMany({
  //   ThoughtName: 'My first goal completed!',
  //   inPerson: false,
  //   users: [...userData.map(({_id}) => _id)],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});