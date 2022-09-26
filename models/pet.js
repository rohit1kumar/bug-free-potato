const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        // minlength: [3, 'Name must be at least 3 characters long'],
        // maxlength: [30, 'Name must be at most 30 characters long'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        trim: true,
        // minlength: [3, 'Type must be at least 3 characters long'],
        // maxlength: [30, 'Type must be at most 30 characters long'],
    },
    breed: {
        type: String,
        required: [true, 'Breed is required'],
        trim: true,
        // minlength: [3, 'Breed must be at least 3 characters long'],
        // maxlength: [30, 'Breed must be at most 30 characters long'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        trim: true,
        // min: [0, 'Age must be at least 0'],
        // max: [30, 'Age must be at most 30'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };
