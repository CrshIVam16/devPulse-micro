const express = require('express');
const router = express.Router();
const {
    getIssues,
    createIssue,
    updateIssue,
    deleteIssue,
} = require('../controllers/issueController');

// Route definitions mapped to controller functions
router.route('/')
    .get(getIssues)
    .post(createIssue);

router.route('/:id')
    .put(updateIssue)
    .delete(deleteIssue);

module.exports = router;