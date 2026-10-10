const Issue = require('../models/Issue');

// Get all issues with optional status filter
exports.getIssues = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status && status !== 'All' ? { status } : {};

        // Fetch issues matching filter, newest first
        const issues = await Issue.find(filter).sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch issues', error: error.message });
    }
};

// Create a new issue
exports.createIssue = async (req, res) => {
    try {
        const { title, snippet, language, priority } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is mandatory' });
        }

        const newIssue = await Issue.create({ title, snippet, language, priority });
        res.status(201).json(newIssue);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create issue', error: error.message });
    }
};

// Update issue status or details
exports.updateIssue = async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return updated doc and validate schema
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update issue', error: error.message });
    }
};

// Delete an issue
exports.deleteIssue = async (req, res) => {
    try {
        const deleted = await Issue.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete issue', error: error.message });
    }
};