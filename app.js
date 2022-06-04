const api = {
  key: "5f784651ff6aa1a29fe2305910d39331",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(dispalyResults);
}

function dispalyResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");

  date.innerHTML = dateBulder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherEl = document.querySelector('.weather')
  weatherEl.innerHTML = `${weather.weather[0].main}`

  let hiLow = document.querySelector('hi-low')
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBulder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[s.getDay()],
    date = s.getDate(),
    month = months[s.getMonth()],
    year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

