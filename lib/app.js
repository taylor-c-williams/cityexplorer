const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

//Location  Endpoint
app.get('/location', async(req, res) => {
  try {    
    res.json({
      'formatted_query': 'Seattle, WA, USA',
      'latitude': '47.606210',
      'longitude': '-122.332071'
    });
  } catch(e) {    
    res.status(500).json({ error: e.message });
  }
});

// Weather Endpoint
app.get('/weather', async(req, res) => {
  try {    
    res.json([
      {
        'forecast': 'Partly cloudy until afternoon.',
        'time': 'Tuesday, June 29, 2021'
      },
      {
        'forecast': 'Mostly cloudy in the morning.',
        'time': 'Wednesday, June 30, 2021'
      }
    ]);
  } catch(e) {    
    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
