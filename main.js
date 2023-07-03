let bg = document.querySelector('.mouse-parallax-bg');
let card1 = document.querySelector('.mouse-parallax-card-1');

window.addEventListener('mousemove', function (e) {
  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;
  bg.style.transform = 'translate(-' + x * 20 + 'px, -' + y * 20 + 'px)';
  card1.style.transform = 'translate(+' + x * 10 + 'px, -' + y * 10 + 'px)';
});

const header = document.querySelector('.albCard-bg');

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function getWeekDay(date) {
  date = new Date(date);
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[date.getDay()];
}

function removeCards() {
  const prevCard = document.querySelector('.card');
  const prevCards = document.querySelector('.days');
  if (prevCard) {
    prevCard.remove();
  }
  if (prevCards) {
    document.querySelector('.days').remove();
  }
}

function showError(error) {
  const html = `<div class="card">${error}</div>`;
  header.insertAdjacentHTML('afterend', html);
}

function showCards({
  curIcon,
  name,
  country,
  temp,
  date0,
  icon0,
  minTemp0,
  maxTemp0,
  date1,
  icon1,
  minTemp1,
  maxTemp1,
  date2,
  icon2,
  minTemp2,
  maxTemp2,
}) {
  const html = `<div class="card">
          <img class="img" src="${curIcon}" alt="weather" />
          <h2 class="card-city">${name}</h2>
          <div class="card-country">${country}</div>
          <div class="temp">${temp}&deg;</div>
          <div class="day">${getWeekDay(date0)}</div>
          <div class="date">${date0}</div>
          </div>
          <div class="days">
          <div class="daySmall">
          <div class="day1Day daySmallDay">${getWeekDay(date0)}</div>
          <img src="https:${icon0}" alt="" class="img1day" />
          <div class="day1Temp daySmallTemp">${minTemp0}&deg;-${maxTemp0}&deg;</div>
          </div>
          <div class="daySmall">
          <div class="day2Day daySmallDay">${getWeekDay(date1)}</div>
          <img src="${icon1}" alt="" class="img2day" />
          <div class="day1Temp daySmallTemp">${minTemp1}&deg;-${maxTemp1}&deg;</div>
          </div>
          <div class="daySmall">
          <div class="day3Day daySmallDay">${getWeekDay(date2)}</div>
          <img src="${icon2}" alt="" class="img3day" />
          <div class="day1Temp daySmallTemp">${minTemp2}&deg;-${maxTemp2}&deg;</div>
          </div>
          </div>
           `;

  header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=2172d717d2ec429281b151502233006&q=${city}&days=3`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

form.onsubmit = async function (e) {
  e.preventDefault();
  let city = input.value.trim();
  const data = await getWeather(city);

  if (data.error) {
    removeCards();
    showError(data.error.message);
  } else {
    // console.log(data);
    // console.log(data.forecast.forecastday[0].day.condition);
    // console.log(data.forecast.forecastday[0].day.condition.icon);

    const weatherData = {
      curIcon: data.current.condition.icon,
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      icon0: data.forecast.forecastday[0].day.condition.icon,
      icon1: data.forecast.forecastday[1].day.condition.icon,
      icon2: data.forecast.forecastday[2].day.condition.icon,
      minTemp0: data.forecast.forecastday[0].day.mintemp_c,
      minTemp1: data.forecast.forecastday[1].day.mintemp_c,
      minTemp2: data.forecast.forecastday[2].day.mintemp_c,
      maxTemp0: data.forecast.forecastday[0].day.maxtemp_c,
      maxTemp1: data.forecast.forecastday[1].day.maxtemp_c,
      maxTemp2: data.forecast.forecastday[2].day.maxtemp_c,
      date0: data.forecast.forecastday[0].date,
      date1: data.forecast.forecastday[1].date,
      date2: data.forecast.forecastday[2].date,
    };

    removeCards();
    showCards(weatherData);
  }
};
