(() => {
  const noResultsHeader = document.querySelector('.render-movie-cards');
  const drawNoResults = () => {
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
    movieList.forEach((movie) => {
      movieSearchData.innerHTML += `
      <div class="whitecard whitecard--small movie-cards-card" data-id="${movie.imdbId}">
        <div class="movie-cards-card-right">
          <div class="movie-cards-card-image">
            <img src="${movie.Poster}" alt="Movie Image" />
          </div>
        </div>
   
        <div class="movie-cards-card-left">
          <div class="movie-cards-card-title">
            <span>${movie.Title}</span>
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
    });
    $LocoScroll.update();
  };
  fitty('#movie-header', { multiLine: true, maxSize: 150, minSize: 80 });

  const formElement = document.querySelector('.movie-form');
  const movieHeader = document.querySelector('#movie-header');
  const searchInput = document.querySelector('#movie-search');
  $('#movie-reset').click(() => {
    $('#movie-reset').css('display', 'none');
    drawMovieSearchCards();
    $('#movie-header').html('Search');
  });

  drawMovieSearchCards();

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    movieHeader.innerHTML = searchInput.value;
    const mappedResults = MovieService.$fuse.search(searchInput.value).map(({ item }) => item);
    console.log(mappedResults);

    if (mappedResults.length > 1) {
      drawMovieSearchCards(mappedResults);
      $('#movie-reset').css('display', 'block');
    } else {
      drawNoResults();
      $('#movie-reset').css('display', 'block');
    }
  });

  // document.addEventListener('movie-search-done', () => {
  //   console.log(' all movies ', MovieService.results);
  //   drawMovieSearchCards();
  // });

  // document.addEventListener('movie-search-failed', ({ detail }) => {
  //   $LocoScroll.update();
  //   drawMovieSearchCards();
  // });

  const movieCard = document.querySelector('.movie-cards-card');
  movieCard.forEach((card) => {
    card.addEventListener('click', () => {
      MovieService.select(card.dataset.imdbId);
    });
  });
  $LocoScroll.update();
})();
