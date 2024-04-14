const { Schema, model, get } = require('mongoose');

//reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'You need to provide a reaction!',
            maxlength: 280,
        },
        username: {
            type: String,
            required: 'You need to provide a username!',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    // {
    //     toJSON: {
    //         getters: true,
    //     },
    //     id: false,
    // }
);

// Schema to create post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
    type: String,
    required: 'You need to provide a thought!',
    minlength: 1,
    maxlength: 280,
  },
    createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
    username: {
        type: String,
        required: 'You need to provide a username!',
    },
    reactions: [reactionSchema],
    },
    {
      toJSON: {
          virtuals: true,
      },
      id: false,
    }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function() {
   return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

model.exports = Thought;