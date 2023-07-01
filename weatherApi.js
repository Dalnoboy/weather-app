const query =
  'https://api.weatherapi.com/v1/current.json?key=2172d717d2ec429281b151502233006&q=Gort&aqi=no';

fetch(query)
  .then((response) => {
    return response.json();
  })
  .then((dtata) => {
    console.log(data);
  });
