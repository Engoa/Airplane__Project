(() => {
  const drawHomeMediaCard = () => {
    const drawHomeCard = document.querySelector('.render--homecard-media');
    drawHomeCard.innerHTML = `
    <a href="#Media" class="card--anchor">
  <div class="homecards__card__data">
    <div class="homecards__card__text" id="card-media">
      <div class='mediacard--header--container'>
        <h2 class="title movie--name" id="fitty-title2">${MediaPlayer.playingNow.title}</h2>
       
      </div>
      <div>
        <span class="title--description"
          >${MediaPlayer.songs.length} Songs</span
        >
      </div>
      <div>
        <i class="fas fa-headphones card--icon"></i>
      </div>
    </div>
    <div class="homecards__card__image">
      <img src="${MediaPlayer.playingNow.cover_img}" alt="music image" />
       <div class="boxContainer">
          <div class="box box1"></div>
          <div class="box box2"></div>
          <div class="box box3"></div>
          <div class="box box4"></div>
          <div class="box box5"></div>
        </div>
    </div>
  </div>
</a>

          `;
    fitty('#fitty-title2', { multiLine: true });
  };

  const apiKey = 'a505effdf68e5b04fa5eb42d16b7374c';
  const findLocation = () => {
    const location = navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;
      fetch(url).then((res) => res.json().then((data) => renderWeatherCards(data)));
      if (!latitude || !longitude) {
        console.log('No location selected');
      }
    });
    return location;
  };
  findLocation();

  const renderWeatherCards = (data) => {
    let { temp, weather } = data.current;
    const { timezone } = data;
    console.log(data.current);
    document.querySelector('.render--homecard-weather').innerHTML += `
      <a href="#Weather" class="card--anchor">
        <div class="homecards__card__data">
          <div class="homecards__card__text">
            <div>
              <h2 class="city--name" id='fitty-title3'>${timezone}</h2>
            </div>
            <div>
            <h2 class="title">${temp.toFixed(0)}°</h2>
          </div>
            <div>
              <span class="title--description">${weather[0].description}</span>
            </div>
          </div>
          <div class="homecards__card__image">
            <img src="../assets/images/rainy.png" alt="temperature image" />
          </div>
        </div>
      </a>    
      `;
    fitty('#fitty-title3', { multiLine: true });
  };
  drawHomeMediaCard();
})();
