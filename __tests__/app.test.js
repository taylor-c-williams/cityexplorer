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
  });
});
