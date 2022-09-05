const { Schema, model } = require('mongoose');
const Thought = require('./Thought')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //needs a validator
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,

                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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
)

UserSchema.pre('remove', async function () {
    await Thought.remove({ _id: { $in: this.thoughts } })
});

//gets total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;