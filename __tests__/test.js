require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');

const { locationData } = require ('../lib/utils.js');
const { data } = require ('../data/locdata.js');


describe('app routes', () => {
  describe('', () => {

    //Location
    test('returns location data', async() => {
      const expectation = {
        'formatted_query': 'Portland, Multnomah County, Oregon, USA',
        'latitude': '45.5202471',
        'longitude': '-122.6741949'
      };
      
      const mungedData = locationData(data);
      expect (mungedData).toEqual(expectation);
    });

    //Weather
    test('returns weather data', async() => {

      const expectation = [
        {
          'forecast': 'Light rain',
          'time': 'Friday, October 15, 2021'
        },
        {
          'forecast': 'Broken clouds',
          'time': 'Saturday, October 16, 2021'
        },
        {
          'forecast': 'Clear Sky',
          'time': 'Sunday, October 17, 2021'
        },
        {
          'forecast': 'Overcast clouds',
          'time': 'Monday, October 18, 2021'
        },
        {
          'forecast': 'Few clouds',
          'time': 'Tuesday, October 19, 2021'
        },
        {
          'forecast': 'Overcast clouds',
          'time': 'Wednesday, October 20, 2021'
        },
        {
          'forecast': 'Broken clouds',
          'time': 'Thursday, October 21, 2021'
        }
      ];       

      const data = await fakeRequest(app)
        .get('/weather/?latitude=38.123&longitude=-78.543&key=9ffadac5d30740f5ab8fe42efc587085')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining(expectation));
    });

    // Reviews
    test('returns reviews data', async() => {

      const expectation = [
        {
          'name': 'Mother’s Bistro & Bar',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/5lWNz5gC1jNp1zFxDXUfkg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/mother-s-bistro-and-bar-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Andina Restaurant',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/Ij9yv97Ch6NwKhNdpezRhw/o.jpg',
          'price': '$$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/andina-restaurant-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Deschutes Brewery Portland Public House',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/a-Av4dG6Xv3f1_XysFj4ow/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/deschutes-brewery-portland-public-house-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Lechon',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/1sE02Y1glmOvdRA54VIlYA/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/lechon-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Portland City Grill',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/vHZOSd_AYOTRwwdKj7gjgQ/o.jpg',
          'price': '$$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/portland-city-grill-portland-7?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Cheryl’s on 12th',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/e4qKpwprT3RIAonsescOAQ/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/cheryl-s-on-12th-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Luc Lac',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Salt & Straw',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Bx55I9XTo14rm1pKR-ED1A/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/salt-and-straw-portland-2?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Grassa',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/zloG1rU5-15Q4MVmf8inbA/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/grassa-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Screen Door East side',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/screen-door-east-side-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Ground Kontrol Classic Arcade',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/fHh5Y_5_mTIf5KHurlUabg/o.jpg',
          'price': '$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/ground-kontrol-classic-arcade-portland-2?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Nong\'s Khao Man Gai',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/jtp9n8HTjid4lEeXlcKKiA/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/nongs-khao-man-gai-portland-2?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Ovation Coffee & Tea',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/TmgO-Db06XaWze9irs92IA/o.jpg',
          'price': '$',
          'rating': 5,
          'url': 'https://www.yelp.com/biz/ovation-coffee-and-tea-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Q Restaurant & Bar',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/jAH0XyZe5N8YTrOy71SuJg/o.jpg',
          'price': '$$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/q-restaurant-and-bar-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Mediterranean Exploration Company',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/AwxZ3eb04OiVH-92xKf_jg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/mediterranean-exploration-company-portland-2?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Cuon - Vietnamese Street Food',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Zetji_yDJJDG8eksunYiTg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/cuon-vietnamese-street-food-portland-3?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Stumptown Coffee Roasters',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ZRKWUoGRDo1FryxlHfooRw/o.jpg',
          'price': '$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/stumptown-coffee-roasters-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Lardo',
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/b0E-cDYYiWuvBxFH-YPONA/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/lardo-portland-4?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Teardrop Cocktail Lounge',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/0ZHcCKzqeIfBBkm4IpXaHg/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/teardrop-cocktail-lounge-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        },
        {
          'name': 'Lan Su Chinese Garden',
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/sbiVlcFpJAS1oJUez3SEPQ/o.jpg',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/lan-su-chinese-garden-portland?adjust_creative=Aq-12RQEloTHZrgHiKvQVg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Aq-12RQEloTHZrgHiKvQVg'
        }
      ];   

      const data = await fakeRequest(app)
        .get('/reviews?latitude=45.523064&longitude=-122.676483')
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