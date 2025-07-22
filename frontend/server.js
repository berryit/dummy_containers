const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');  // install with `npm install node-fetch`

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';

app.use(express.json());

// Serve the HTML
app.get('/', (req, res) => {
  const template = fs.readFileSync(path.join(__dirname, 'index.template.html'), 'utf8');
  const rendered = template.replace('{{BACKEND_URL}}', '');  // we don’t need it in frontend anymore
  res.send(rendered);
});

// Handle form POST via backend
app.post('/api', async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running at http://0.0.0.0:${PORT}`);
  console.log(`Using backend URL: ${BACKEND_URL}`);
});
