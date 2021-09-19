(() => {
  const drawWeatherHeader = () => {
    if (!WeatherService.data) return;
    let { timezone, temp, weather, current } = WeatherService.data;

    // If / exists, add a space to the name of the country
    if (timezone.includes('/')) {
      timezone = timezone.split('/').join(' / ');
    }

    // Header section
    let date = unix(current.dt, 'DD/MM/YY');
    $('.weather__header h1').html(timezone);
    // $('.weather__header p').html(date);
    fitty('.weather__header h1', { multiLine: true, maxSize: 100, minSize: 80 });

    drawMainCardHeader();
    drawWeatherDaily();
    drawMainCardStats();
  };

  //  Weather Daily Cards small
  const drawWeatherDaily = () => {
    WeatherService.data.daily.forEach((day) => {
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      let days = unix(day.dt, 'ddd');
      let date = unix(day.dt, 'DD/MM/YY');
      document.querySelector('.weather__daily').innerHTML += `
    <div class="whitecard whitecard--small weather-cards">

    <div class="weather-cards-card">
       <div class="weather-cards-card__day">
         <h1>${days}</h1>
         <span>${date}</span>
      </div>
      <div class="weather-cards-card__temp">
     <span>${Math.trunc(day.temp.min)}° - ${Math.trunc(day.temp.max)}° </span>
     <span>${day.weather[0].main}</span>
    </div>
     <div class="weather-cards-card__image">
    <img src="${icon}" />
     </div>
      </div>
     </div>
  
        `;
    });
  };

  // Draw Weather app main big card
  const drawMainCardHeader = () => {
    let { current } = WeatherService.data;
    let date = unix(current.dt, 'DD/MM/YY');
    let time = unix(current.dt, 'dddd, H:m Z');
    document.querySelector('.weather__app').innerHTML += `
  <div class="weather__app__container">
      <div class="weather__app__current">
        <div class="weather__app__current-left">
          <div class="weather__app__current-date">
            <h3>${date}</h3>
          </div>
          <div class="weather__app__current-time">
            <h3>${time}</h3>
          </div>
          <div class="weather__app__current-temp">
            <h3>${Math.trunc(current.temp)}°</h3>
          </div>
          <div class="weather__app__current-description">
            <h3>${current.weather[0].description}</h3>
          </div>
        </div>
        <div class="weather__app__current-right">
          <img
            class='darkimage'
            src="https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHdlYXRoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Weather Image"/>
          <img
            class='lightimage'
            src="https://media.istockphoto.com/photos/blue-soft-sky-picture-id456874367?b=1&k=20&m=456874367&s=170667a&w=0&h=xKYR-ceyqMn4xGoQPyiiyATNSFnc7d1X-SYpA4ZjnJ8="
            alt="Weather Image"/>
        </div>
      </div>
       <div class="weather__app__stats"></div>
    </div>
    
    
    `;
  };

  const drawMainCardStats = () => {
    let { current } = WeatherService.data;
    let sunrise = unix(current.sunrise, 'H:m');
    let sunset = unix(current.sunset, 'H:m');
    document.querySelector('.weather__app__stats').innerHTML = `
      <div class="weather__stat weather__stat__subject">
        <div class="weather__stat--title">
           <h3>UV-Index</h3>
        </div>
        <div class="weather__stat--icon">
       <i class="fas fa-sun"></i>
        </div>
        <div class="weather__stat--text">
        <span>${current.uvi}</span>
        </div>
       </div>
      <div class="weather__stat weather__stat__subject">
        <div class="weather__stat--title">
           <h3>Humidity</h3>
        </div>
        <div class="weather__stat--icon">
      <i class="fas fa-water"></i>
        </div>
        <div class="weather__stat--text">
        <span>${current.humidity}%</span>
        </div>
      </div>
      <div class="weather__stat weather__stat__subject ">
        <div class="weather__stat--title">
           <h3>wind</h3>
        </div>
        <div class="weather__stat--icon">
      <i class="fas fa-wind"></i>
        </div>
        <div class="weather__stat--text wind--text">
        <span >${current.wind_speed}</span> <span>km/h</span>
        </div>
      </div>
      <div class="weather__stat weather__stat__subject">
         <div class="weather__stat--title">
           <h3>Feels like</h3>
        </div>
        <div class="weather__stat--icon">
      <i class="fas fa-thermometer-half"></i>
        </div>
        <div class="weather__stat--text">
        <span>${Math.trunc(current.feels_like)}°</span>
        </div>
      </div>
      <div class="weather__stat weather__stat__subject weather__stat__twilight--wrapper">
      <div class="weather__stat--twilight">
        
        <div class="weather__stat--sunrise">
          <div class="weather__stat--title">
            <h3>Sunset</h3>
          </div>
            <div class="weather__stat--icon">
            <i class="fas fa-cloud-sun"></i>
          </div>
          <div>
            <h3>${sunrise}</h3>
          </div>
        </div>
        <div class="weather__stat--sunset">
          <div class="weather__stat--title">
            <h3>Sunset</h3>
          </div>
            <div class="weather__stat--icon">
            <i class="fas fa-cloud-moon"></i>
          </div>
          <div>
            <h3>${sunset}</h3>
          </div>
        </div>
      </div>
      </div>
    
    `;
  };

  // Call one function that calls all
  drawWeatherHeader();
  document.addEventListener('on-weather-init', () => {
    drawWeatherHeader();

    $LocoScroll.update();
  });
  $LocoScroll.update();
})();
