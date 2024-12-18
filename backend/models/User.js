const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing the password

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'candidate']
    }
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    // Hash the password with a salt rounds of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with stored hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
