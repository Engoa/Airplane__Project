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
      <div class="whitecard whitecard--small movie-cards-card" data-id="${movie.imdbID}" >
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
      fitty('.movie-card-fitty', { multiLine: true });
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
    if (!MovieService.selectedMovie) return;
    $('.render-movie-service').html(`
  <div class="movie__service__top">
    <div class="movie__service__top--image">
      <img src="${MovieService.selectedMovie.Poster}" alt="Movie Image" />
    </div>
    <div class="movie__service__top-header">
      <div class="movie__service__top-header-title">
        <h3 id="movie-main-title">${MovieService.selectedMovie.Title}</h3>
      </div>
      <div class="movie__service__top-header-runtime">
        <h5>${MovieService.selectedMovie.Runtime}</h5>
        <h5>${MovieService.selectedMovie.Year}</h5>
        <h5 id="movie-rating">${MovieService.selectedMovie.Rated}</h5>
      </div>
    </div>
    <div class="movie__service__top-genre">
      <span class="genre-text">${MovieService.selectedMovie.Genre}</span>
    </div>
  </div>
  <div class="movie__service__data">
  <div class="movie__service__data-top">
    <div class="movie__service__data-left">
      <div class="movie__service__data-left-actors">
        <h5>Actors</h5>
        <span><strong><span>Main Actors - </span></strong>${
          MovieService.selectedMovie.Actors
        }</span>
      </div>
      <div class="movie__service__data-left-details">
        <h5>Details</h5>
        <span
          ><strong>Producer</strong> - ${
            !MovieService.selectedMovie.Production
              ? 'N/A'
              : MovieService.selectedMovie.Production
          }</span
        >
        <span><strong>Writer</strong> - ${
          !MovieService.selectedMovie.Writer ? 'Unknown' : MovieService.selectedMovie.Writer
        }</span>
        <span
          ><strong>Box Office</strong> - ${
            !MovieService.selectedMovie.BoxOffice
              ? 'Unknown'
              : MovieService.selectedMovie.BoxOffice
          }</span
        >
        <span><strong>State</strong> - ${MovieService.selectedMovie.Country}</span>
      </div>
      </div>
      <div class="movie__service__data-right">
        <div class="movie__service__data-right-awards">
          <h5 class='awards-header'>Awards & Score</h5>
          <span><strong>Nominations</strong> - ${MovieService.selectedMovie.Awards}</span>
          <span
            ><strong>IMDb Rating</strong> - ${MovieService.selectedMovie.imdbRating} / 10</span
          >
          <span><strong>IMDb Votes</strong> - ${MovieService.selectedMovie.imdbVotes}</span>
         
        </div>
      </div>
      </div>
      <div class="movie__service__data-plot">
        <h5>PLOT</h5>
        <p>${MovieService.selectedMovie.Plot}</p>
      </div>
      <div class="movie__service__data-metacritic">
        <h5>Metacritic</h5>
       <span>${MovieService.selectedMovie.Metascore} / 100</span>
      </div>
  </div>

          `);
    //Fitty for the main movie card tittle
    fitty('#movie-main-title', { multiLine: true, minSize: 40, maxSize: 100 });

    // On genre tag click, set the values to the input box
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
