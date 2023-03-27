const OpenAPIBackend = require('openapi-backend').default;
const handlers = require('../api/handler')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// define api
const api = new OpenAPIBackend({
  definition: './api/reservation.yml',
  handlers
});

// express middleware
app.use((req, res) => api.handleRequest(req, req, res));

api.init();

// start server
app.listen(9000, () => console.info('api listening at http://localhost:9000'));