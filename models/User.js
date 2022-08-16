const { Schema, model } = require('mongoose');

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
            virtuals: true
        }
    }
)

//gets total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.user.length + 1, 0) 
})

const User = model('User', UserSchema);

module.exports = User;