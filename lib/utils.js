function locationData(body) {
  return {
    formatted_query: body[0].display_name,
    latitude: body[0].lat,
    longitude: body[0].lon
  };
}

function weatherData(body) {
  const data = body.data.map (item => {
    const obj = {};
    let options = { weekday:'long', month:'long', day:'numeric',  year:'numeric' };
    obj ['forecast'] = item.weather.description;
    obj ['time'] = new Date (item.datetime).toLocaleString('en-US', options);
    return obj;
  });
  const week = data.slice(-7);
  return week;
}

function reviewData(body) {
  const data = body.businesses.map (item => {
    const obj = {};
    obj ['name'] = item.name;
    obj ['image_url'] = item.image_url;
    obj ['price'] = item.price;
    obj ['rating'] = item.rating;
    obj ['url'] = item.url;
    return obj;
  });
  return data;
}
module.exports = { locationData, weatherData, reviewData };