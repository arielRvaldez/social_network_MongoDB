const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create post model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true,
    minlength: 1,
    maxlength: 280,
  },
    createdAt: { type: Date, default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
    username: { type: String, required: true,},
    reactions: [reactionSchema],
    },
    {
      toJSON: {
          getters: true,
      },
      id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
   return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

model.exports = Thought;