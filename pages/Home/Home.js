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

    // Audio Wave on Home check if playing or not
    if (!MediaPlayer.isPlaying) {
      $('.boxContainer').css('display', 'none');
    } else {
      $('.boxContainer').css('display', 'flex');
    }
  };

  const drawHomeWeatherCard = () => {
    if (!WeatherService.data) return;

    const {
      timezone,
      current: { temp, weather },
    } = WeatherService.data;

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
            <div>
            <i class="fas fa-cloud" ></i>
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

  const drawHomeMovieCard = () => {
    const drawMovieCard = document.querySelector('.render--homecard-movie');
    if (!MovieService.selectedMovie || !drawMovieCard) return;
    drawMovieCard.innerHTML = `
       <a href="#Movies" class="card--anchor">
        <div class="homecards__weather__temperature">
          <div class="homecards__weather__degrees homecards__movies__details">
            <div>
              <h2 class="degree movie--name" id="fitty-title4">${MovieService.selectedMovie.Title}</h2>
              <span class="degree--description movie--year">${MovieService.selectedMovie.Year}</span>
            </div>
            <div>
              <span class="degree--description movie--duration">${MovieService.selectedMovie.Runtime}</span>
            </div>
            <div>
              <i class="fas fa-video card--icon"></i>
            </div>
          </div>
          <div class="homecards__weather__image homecards__movies--image">
            <img src="${MovieService.selectedMovie.Poster}" alt="temperature image" />
          </div>
        </div>
      </a>
      `;
    fitty('#fitty-title4', { multiLine: true });
  };

  drawHomeMediaCard();
  drawHomeWeatherCard();
  drawHomeMovieCard();
  document.addEventListener('on-weather-init', () => {
    drawHomeWeatherCard();
  });
  document.addEventListener('song-selected', () => {
    drawHomeMediaCard();
  });

  ['movie-selected', 'movie-search-done'].forEach((item) => {
    document.addEventListener(item, () => {
      drawHomeMovieCard();
    });
  });
})();
