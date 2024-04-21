const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const { Thought } = require('../models');

// Aggregate function to get the number of Friends overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('UserCount');
  return numberOfUsers;
}

module.exports = {
  // Get all friends
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(friendObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single friend
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No friend with that ID' })
      }

      res.json(user);
      
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new friend
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a thought to a friend
  async addThought(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      res.json('Added your thought! 🎉');
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove thought from a friend
  async removeThought(req, res) {
    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      res.json('Thought removed!');
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
