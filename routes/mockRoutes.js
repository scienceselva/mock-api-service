const express = require('express');
const router = express.Router();
const controller = require('../controllers/mockController');

// API routes
router.post('/mock', controller.createMockApi);
router.get('/mock/user/:userId', controller.getMockApisByUser);
router.put('/mock/:id', controller.updateMockApi);

// Dynamic mock playback (should be last)
router.all('/mocked/*name', controller.handleMock);

module.exports = router;
