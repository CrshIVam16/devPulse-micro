const mongoose = require('mongoose');

// Schema for developer issue and code snippet tracking
const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        snippet: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            enum: ['javascript', 'python', 'react', 'general'],
            default: 'general',
        },
        status: {
            type: String,
            enum: ['Todo', 'In Progress', 'Resolved'],
            default: 'Todo',
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
        },
    },
    { timestamps: true } // Auto-manages createdAt and updatedAt
);

module.exports = mongoose.model('Issue', issueSchema);