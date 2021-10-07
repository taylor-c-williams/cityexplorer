const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { mungedLocationData } = require('./utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

//Location  Endpoint
app.get('/location', async(req, res) => {
  try {
    const cityName = req.query.search;
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${cityName}&format=json`);
    const mungedResponse = mungedLocationData(response.body);
    res.json(mungedResponse);
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

//Reviews Endpoint
app.get('/reviews', async(req, res) => {
  try {    
    res.json([
      {
        'name': 'Pike Place Chowder',
        'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg',
        'price': '$$   ',
        'rating': '4.5',
        'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      },
      {
        'name': 'Umi Sake House',
        'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/c-XwgpadB530bjPUAL7oFw/o.jpg',
        'price': '$$   ',
        'rating': '4.0',
        'url': 'https://www.yelp.com/biz/umi-sake-house-seattle?adjust_creative=uK0rfzqjBmWNj6-d3ujNVA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=uK0rfzqjBmWNj6-d3ujNVA'
      },
    ]);
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

