// server.js
const express = require('express');
const cors = require('cors'); // cors modülünü ekleyin
const app = express();
const path = require('path');
const fs = require('fs');

const port = 3000;
const jsonFilePath = 'yemekler.json'; // JSON dosyanızın yolu

// CORS politikalarını yapılandırın
app.use(cors());

app.get('/api/yemekler', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Hata:', err);
      return res.status(500).json({ error: 'Veri çekme hatası' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      console.error('Hata:', err);
      return res.status(500).json({ error: 'JSON ayrıştırma hatası' });
    }
  });
});

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
