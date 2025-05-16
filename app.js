const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/mockRoutes');
const sequelize = require('./config/db');
const MockApi = require('./models/mockApi');

const app = express();

app.use(express.static('public'))

app.use(bodyParser.json());
app.use('/', routes);

// Sync DB
sequelize.sync();

module.exports = app;
