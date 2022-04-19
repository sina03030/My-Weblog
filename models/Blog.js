const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 255,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.Blog = mongoose.model('Blog', blogSchema);