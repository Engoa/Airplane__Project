(() => {
  const drawHomeMediaCard = () => {
    const drawHomeCard = document.querySelector('.render--homecard-media');
    if (!drawHomeCard) return;
    drawHomeCard.innerHTML = `
    <a href="#Media" class="card--anchor">
  <div class="homecards__weather__temperature homecards__media">
    <div class="homecards__weather__degrees" id="card-media">
      <div class='mediacard--header--container'>
        <h2 class="degree movie--name" id="fitty-title2">${MediaPlayer.playingNow.title}</h2>
       
      </div>
      <div>
        <span class="degree--description movie--duration"
          >${MediaPlayer.songs.length} Songs</span
        >
      </div>
      <div>
        <i class="fas fa-headphones card--icon"></i>
      </div>
    </div>
    <div class="homecards__weather__image homecards__movies--image card--media--img">
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
    // Audio Wave check if playing or not
    if (!MediaPlayer.isPlaying) {
      $('.boxContainer').css('display', 'none');
    } else {
      $('.boxContainer').css('display', 'flex');
    }
  };

  // API for Weather
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
    document.querySelector('.render--homecard-weather').innerHTML += `
      <a href="#Weather" class="card--anchor">
        <div class="homecards__weather__temperature">
          <div class="homecards__weather__degrees">
            <div>
              <h2 class="city--name" id='fitty-title3'>${timezone}</h2>
            </div>
            <div>
            <h2 class="degree">${temp.toFixed(0)}°</h2>
          </div>
            <div>
              <span class="degree--description">${weather[0].description}</span>
            </div>
          </div>
          <div class="homecards__weather__image">
            <img src="../assets/images/rainy.png" alt="temperature image" />
          </div>
        </div>
      </a>    
      `;
    fitty('#fitty-title3', { multiLine: true });
  };

  drawHomeMediaCard();

  document.addEventListener('song-selected', () => drawHomeMediaCard());
})();
