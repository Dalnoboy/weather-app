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

form.onsubmit = function (e) {
  e.preventDefault();
  let city = input.value.trim();

  const query = `https://api.weatherapi.com/v1/forecast.json?key=2172d717d2ec429281b151502233006&q=${city}&days=3`;

  fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        const prevCard = document.querySelector('.card');
        document.querySelector('.card').remove();
        const html = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML('afterend', html);
      } else {
        // console.log(data);
        // console.log(data.forecast.forecastday[0].day.condition);
        // console.log(data.forecast.forecastday[0].day.condition.icon);

        let date0 = new Date(data.forecast.forecastday[0].date);
        let date1 = new Date(data.forecast.forecastday[1].date);
        let date2 = new Date(data.forecast.forecastday[2].date);
        document.querySelector('.card').remove();
        document.querySelector('.days').remove();
        const html = `<div class="card">
      <img class="img" src="${data.current.condition.icon}" alt="weather" />
      <h2 class="card-city">${data.location.name}</h2>
      <div class="card-country">${data.location.country}</div>
      <div class="temp">${data.current.temp_c}&deg;</div>
      <div class="day">${getWeekDay(date0)}</div>
      <div class="date">${data.forecast.forecastday[0].date}</div>
      </div>
      <div class="days">
        <div class="daySmall">
          <div class="day1Day daySmallDay">${getWeekDay(date0)}</div>
          <img src="https:${
            data.forecast.forecastday[0].day.condition.icon
          }" alt="" class="img1day" />
          <div class="day1Temp daySmallTemp">${
            data.forecast.forecastday[0].day.maxtemp_c
          }&deg;-${data.forecast.forecastday[0].day.mintemp_c}&deg;</div>
        </div>
        <div class="daySmall">
          <div class="day2Day daySmallDay">${getWeekDay(date1)}</div>
          <img src="${
            data.forecast.forecastday[1].day.condition.icon
          }" alt="" class="img2day" />
          <div class="day1Temp daySmallTemp">${
            data.forecast.forecastday[1].day.maxtemp_c
          }&deg;-${data.forecast.forecastday[1].day.mintemp_c}&deg;</div>
        </div>
        <div class="daySmall">
          <div class="day3Day daySmallDay">${getWeekDay(date2)}</div>
          <img src="${
            data.forecast.forecastday[2].day.condition.icon
          }" alt="" class="img3day" />
          <div class="day1Temp daySmallTemp">${
            data.forecast.forecastday[2].day.maxtemp_c
          }&deg;-${data.forecast.forecastday[2].day.mintemp_c}&deg;</div>
        </div>
      </div>
       `;

        header.insertAdjacentHTML('afterend', html);
      }
    });
};
