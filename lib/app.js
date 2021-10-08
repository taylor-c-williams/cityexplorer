const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { locationData, weatherData, reviewData } = require('./utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

//Location  Endpoint
app.get('/location', async(req, res) => {
  try {
    const cityName = req.query.search;
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${cityName}&format=json`);
    const mungedResponse = locationData(response.body);
    res.json(mungedResponse);
  } catch(e) {    
    res.status(500).json({ error: e.message });
  }
});

// Weather Endpoint
app.get('/weather', async(req, res) => {
  try {    
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`);
    const mungedResponse = weatherData(response.body);
    res.json(mungedResponse);
  } catch(e) {    
    res.status(500).json({ error: e.message });
  }
});

//Reviews Endpoint
app.get('/reviews', async(req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const response = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`).set('Authorization', `Bearer ${process.env.YELP_KEY}`);
    const mungedResponse = reviewData(response.body);    
    res.json(mungedResponse);
  } catch(e) {    
    res.status(500).json({ error: e.message });
  }
});

//Trails Endpoint
app.get('/trails', async(req, res) => {
  try {    
    res.json([
      {
        'name': 'Rattlesnake Ledge',
        'location': 'Riverbend, Washington',
        'length': '4.3',
        'stars': '4.4',
        'star_votes': '84',
        'summary': 'An extremely popular out-and-back hike to the viewpoint on Rattlesnake Ledge.',
        'trail_url': 'https://www.hikingproject.com/trail/7021679/rattlesnake-ledge',
        'conditions': 'Dry: The trail is clearly marked and well maintained.',
        'condition_date': '2018-07-21',
        'condition_time': '0:00:00 '
      },
      {
        'name': 'Mt. Si',
        'location': 'Tanner, Washington',
        'length': '6.6',
        'stars': '4.4',
        'star_votes': '72',
        'summary': 'A steep, well-maintained trail takes you atop Mt. Si with outrageous views of Puget Sound.',
        'trail_url': 'https://www.hikingproject.com/trail/7001016/mt-si',
        'conditions': 'Dry',
        'condition_date': '2018-07-22',
        'condition_time': '0:17:22 '
      }
    ]
    );
  } catch(e) {    
    res.status(500).json({ error: e.message });
  }
});



app.use(require('./middleware/error'));

module.exports = app;

