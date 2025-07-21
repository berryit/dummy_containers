const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

app.get('/', (req, res) => {
  const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8');
  const rendered = template.replace('{{BACKEND_URL}}', BACKEND_URL);
  res.send(rendered);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running at http://0.0.0.0:${PORT}`);
  console.log(`Using backend URL: ${BACKEND_URL}`);
});
