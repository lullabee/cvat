const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('/usr/share/nginx/html'));

// Special handling for login endpoint
app.post('/api/auth/login', (req, res) => {
  // Convert form data to JSON if needed
  let loginData;
  
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    // Convert form data to JSON
    loginData = {
      username: req.body.username,
      password: req.body.password
    };
  } else {
    // Already JSON
    loginData = req.body;
  }
  
  // Forward to CVAT server
  const fetch = require('node-fetch');
  
  fetch('http://cvat_server:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Host': 'localhost:8080',
    },
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Proxy all other API requests
app.use('/api', createProxyMiddleware({
  target: 'http://cvat_server:8080',
  changeOrigin: true,
  headers: {
    'Host': 'localhost:8080'
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile('/usr/share/nginx/html/index.html');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy server running on port ${PORT}`);
});