const FUSE_OPTIONS = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  includeMatches: true,
  // findAllMatches: false,
  // minMatchCharLength: 3,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: ['Title', 'Genre', 'Type', 'Actors'],
};

const MovieService = {
  // DATA MEMBERS
  $fuse: null,
  movie: null,
  results: [],
  selectedID: null,

  // GETTERS
  get selectedMovie() {
    return this.getMovieById(this.selectedID);
  },

  // METHODS
  getMovieById(id) {
    return this.results.find((movie) => movie.imdbID === id);
  },

  async select(imdbId) {
    this.selectedID = imdbId;
    this.movie = await this.fetchAllMovies(this.selectedID);

    document.dispatchEvent(new CustomEvent('movie-selected'));
  },

  async fetchAllMovies() {
    this.results = await fetch('../assets/jsons/movies.json').then((res) => res.json());
    this.$fuse = new Fuse(this.results, FUSE_OPTIONS);

    document.dispatchEvent(new CustomEvent('movie-search-done'));
  },
};

(async () => {
  await MovieService.fetchAllMovies();
  console.log(MovieService.results);
})();

// GET ALL MOVIES BY ID

// (async () => {
//   await MovieService.fetchAllMovies();
//   const allMovies = [];

//   for (const result of MovieService.results) {
//     allMovies.push(MovieService.fetchByTitle(result.imdbID));
//   }

//   console.log(allMovies);
// })();
