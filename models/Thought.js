const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
    thoughText: {
        type: String,
        required: true,
        // between 1-280 chars
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent thought _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        trim: true
      },
      username: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },

      reactions: [ReactionSchema]
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;