function locationData(body) {
  return {
    formatted_query: body[0].display_name,
    latitude: body[0].lat,
    longitude: body[0].lon
  };
}

function weatherData(body) {
  const data = body.map (item => {
    const obj = {};
    let options = { weekday:'long', month:'long', day:'numeric',  year:'numeric' };
    obj ['forecast'] = item.weather.description;
    obj ['time'] = new Date (item.datetime).toLocaleString('en-US', options);
    console.log(obj);
    const week = obj.slice(-7);
    return week;
  });
  return data;
}

module.exports = { locationData, weatherData };