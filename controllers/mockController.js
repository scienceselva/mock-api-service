const MockApi = require('../models/mockApi');

// Create mock API
exports.createMockApi = async (req, res) => {
  try {
    const { userId, method, path, queryParams, requestBody, responseBody } = req.body;

    const mockApi = await MockApi.create({
      userId,
      method: method.toUpperCase(),
      path,
      queryParams: JSON.stringify(queryParams || {}),
      requestBody,
      responseBody,
    });

    res.status(201).json(mockApi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all APIs by user
exports.getMockApisByUser = async (req, res) => {
  const { userId } = req.params;
  const apis = await MockApi.findAll({ where: { userId } });
  res.json(apis);
};

// Update a mock API
exports.updateMockApi = async (req, res) => {
  const { id } = req.params;
  const { responseBody } = req.body;

  try {
    const mockApi = await MockApi.findByPk(id);
    if (!mockApi) return res.status(404).json({ error: 'API not found' });

    mockApi.responseBody = responseBody;
    await mockApi.save();

    res.json(mockApi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dynamic mock handler
exports.handleMock = async (req, res) => {

  const fullPath = req.path.replace(/^\/mocked/, ''); // strip prefix
  const method = req.method.toUpperCase();
  const queryParams = JSON.stringify(req.query || {});

  const mockApi = await MockApi.findOne({
    where: { path: fullPath, method, queryParams },
  });

  if (!mockApi) return res.status(404).json({ error: 'Mock not found' });
  res.json(mockApi.responseBody);
};
