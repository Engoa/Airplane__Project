(() => {
  const drawMovieHeader = () => {
    const movieHeaders = document.querySelector('');
  };
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
      <div class="whitecard whitecard--small movie-cards-card">
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
          <div class="movie-cards-card-genre">
            <span>${movie.Year}</span>
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
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    movieHeader.innerHTML = searchInput.value;
    const mappedResults = MovieService.$fuse.search(searchInput.value).map(({ item }) => item);
    console.log(mappedResults);

    if (mappedResults.length) {
      drawMovieSearchCards(mappedResults);
    } else {
      drawNoResults();
    }
  });

  document.addEventListener('movie-search-done', () => {
    console.log(' all movies ', MovieService.results);
    drawMovieSearchCards();
  });

  document.addEventListener('movie-search-failed', ({ detail }) => {
    // todo print error to somewhere................................................................
    $LocoScroll.update();

    drawMovieSearchCards();
  });

  $LocoScroll.update();
})();
