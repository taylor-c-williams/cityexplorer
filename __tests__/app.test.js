require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  describe('', () => {

    //Location
    test('returns location data', async() => {

      const expectation = {
        'formatted_query': expect.any(String),
        'latitude': expect.any(String),
        'longitude': expect.any(String)
      };       

      const data = await fakeRequest(app)
        .get('/location')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    //Weather
    test('returns weather data', async() => {

      const expectation = [
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        }
      ];       

      const data = await fakeRequest(app)
        .get('/weather')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });

    // Reviews
    test('returns reviews data', async() => {

      const expectation = [
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
        }       
      ];     

      const data = await fakeRequest(app)
        .get('/reviews')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });

    // Trails
    test('returns trails data', async() => {

      const expectation = [
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
      ];           

      const data = await fakeRequest(app)
        .get('/trails')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });
  });
});
