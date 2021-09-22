(() => {
  const formElement = document.querySelector('.movie-form');
  const movieHeader = document.querySelector('#movie-header');
  const searchInput = document.querySelector('#movie-search');

  const drawNoResults = () => {
    const noResultsHeader = document.querySelector('.render-movie-cards');
    noResultsHeader.innerHTML = `
    
    <div class="no-result-wrapper">
    <h3 id="no-result-text">No Results 😟</h3>
    </div>
    `;

    $LocoScroll.update();
    fitty('#no-result-text', { multiLine: true, maxSize: 150, minSize: 80 });
  };

  const drawMovieSearchCards = (searchResults) => {
    const movieSearchData = document.querySelector('.render-movie-cards');
    movieSearchData.innerHTML = '';

    const movieList = searchResults ?? MovieService.results;
    movieList.forEach((movie, index) => {
      movieSearchData.innerHTML += `
      <div class="whitecard whitecard--small movie-cards-card ${
        index % 2 !== 0 ? 'movie-cards-card2' : ''
      }"data-id="${movie.imdbID}">
        <div class="movie-cards-card-right">
          <div class="movie-cards-card-image">
            <img src="${movie.Poster}" alt="Movie Image" />
          </div>
        </div>
   
        <div class="movie-cards-card-left">
          <div class="movie-cards-card-title">
            <span class="movie-card-fitty">${movie.Title}</span>
          </div>
          <div class="movie-cards-card-type">
            <span>${movie.Type}</span>
          </div>
          <div class="movie-cards-card-genre">
            <span>${movie.Genre}</span>
          </div>
          <div class="movie-cards-card-year">
            <span>${movie.Year}</span>
          </div>
          <div class="movie-cards-card-duration">
            <span>${movie.Runtime}</span>
          </div>
        </div>
      </div>
    `;
      fitty('.movie-card-fitty', { multiLine: true, minSize: 10 });
    });
    const movieCard = document.querySelectorAll('.movie-cards-card');
    movieCard.forEach((card) =>
      card.addEventListener('click', () => {
        MovieService.select(card.dataset.id);
      })
    );
    $LocoScroll.update();
  };

  const drawMainMovieCard = () => {
    $('.render-movie-service').html(`
    <div class="movie__service__wrapper">
    <div class="movie__service__top">
            <div class="movie__service__top--image">
              <img src="${MovieService.selectedMovie.Poster}" alt="Movie Image" />
            </div>
            <div class="movie__service__top-title">
              <h3>${MovieService.selectedMovie.Title}</h3>
              <h5>${MovieService.selectedMovie.Runtime}</h5>
              <h5>${MovieService.selectedMovie.Year}</h5>
            </div>
            <div class="movie__service__top-genre">
              <span class="genre-text">${MovieService.selectedMovie.Genre}</span>
            </div>
          </div>
          <div class="movie__service__data">
            <div class="movie__service__data__actors-wrapper">
              <div class="actors-text">
                <h5>Main Actors</h5>
                <span>${MovieService.selectedMovie.Actors}</span>
              </div>
            </div>
            <div class="movie__service__data__content-wrapper">
              <div class="content-text">
                <h5>Details</h5>
                <span>Producer - ${
                  !MovieService.selectedMovie.Production
                    ? MovieService.selectedMovie.Writer
                    : MovieService.selectedMovie.Production
                }</span>
                <span>Box Office - ${
                  !MovieService.selectedMovie.BoxOffice
                    ? 'Unknown'
                    : MovieService.selectedMovie.BoxOffice
                }</span>
                <span>State - ${MovieService.selectedMovie.Country}</span>
              </div>
            </div>
            <div class="movie__service__data__plot-wrapper">
              <div class="plot-text">
                <h5>PLOT</h5>
                <p>
                 ${MovieService.selectedMovie.Plot}
                </p>
              </div>
            </div>
            <div class="movie__service__data__awards-wrapper">
              <div class="awards-text">
                <h5>Awards & Score</h5>
                <span>Nominations - ${MovieService.selectedMovie.Awards}</span>
                <span>IMDb Rating - ${MovieService.selectedMovie.imdbRating}</span>
                <span>IMDb Votes - ${MovieService.selectedMovie.imdbVotes}</span>
              </div>
            </div>
            <div class="movie__service__data__score-wrapper">
              <div class="score-text">
                <h5>Metascore</h5>
                <div>
                  <span>${MovieService.selectedMovie.Metascore}</span>
                </div>
              </div>
            </div>
          </div>
          </div>
          `);
    $('.genre-text').click(() => {
      searchInput.value = MovieService.selectedMovie.Genre;
    });
  };

  // On search make Reset button appear and disapear
  $('#movie-reset').click(() => {
    $('#movie-reset').hide();
    drawMovieSearchCards();
    $('#movie-header').html('Search');
  });

  drawMovieSearchCards();

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    movieHeader.innerHTML = searchInput.value;
    const mappedResults = MovieService.$fuse.search(searchInput.value).map(({ item }) => item);

    // Display search results and Reset button
    if (mappedResults.length > 1) {
      drawMovieSearchCards(mappedResults);
      $('#movie-reset').show();
    } else {
      drawNoResults();
      $('#movie-reset').show();
    }

    // If Input is empty, draw all movie cards
    if (!searchInput.value) {
      drawMovieSearchCards();
      $('#movie-header').html('Search');
      $('#movie-reset').hide();
    }
    $LocoScroll.update();
  });

  document.addEventListener('movie-selected', () => {
    drawMainMovieCard();
  });
  $LocoScroll.update();
})();
