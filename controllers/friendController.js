const { ObjectId } = require('mongoose').Types;
const { Friend, Course } = require('../models');

// Aggregate function to get the number of Friends overall
const headCount = async () => {
  const numberOfFriends = await Friend.aggregate()
    .count('friendCount');
  return numberOfFriends;
}

module.exports = {
  // Get all friends
  async getFriends(req, res) {
    try {
      const friends = await Friend.find();

      const friendObj = {
        friends,
        headCount: await headCount(),
      };

      res.json(friendObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single friend
  async getSingleFriend(req, res) {
    try {
      const friend = await Friend.findOne({ _id: req.params.friendId })
        .select('-__v');

      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' })
      }

      res.json(friend);
      
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new friend
  async createFriend(req, res) {
    try {
      const friend = await Friend.create(req.body);
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a thought to a friend
  async addThought(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);

    try {
      const friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!friend) {
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
      const Friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      res.json('Thought removed! 🎉');
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
