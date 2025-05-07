const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const topSpotsData = require('./data.json');

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/data.json', (req, res) => {
  res.status(200).json(topSpotsData);
});

module.exports = app;
