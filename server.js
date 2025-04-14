const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/save-entries', (req, res) => {
  const content = 'window.entries = ' + JSON.stringify(req.body, null, 2) + ';';
  fs.writeFile(path.join(__dirname, 'entries.js'), content, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.listen(3000, () => {
  console.log('🚀 Server is running at http://localhost:3000');
});
