// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const File = require('../models/File');

router.get('/', async (req, res) => {
  const files = await File.find();
  res.render('index', { files });
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const { filename, path } = req.file;
  const file = new File({ filename, path });
  await file.save();
  res.redirect('/');
});

module.exports = router;
