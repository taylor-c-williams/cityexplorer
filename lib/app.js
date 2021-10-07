const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


// app.get('/api/test', (req, res) => {
//   res.json({
//     message: `in this proctected route, we get the user's id like so: ${req.userId}`
//   });
// });

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

app.use(require('./middleware/error'));

module.exports = app;
