const MOVIE_SEARCH_API = (search) =>
  `http://www.omdbapi.com/?apikey=48004f8a&s=${search}&page=1`;
const MOVIE_API = (title) => `http://www.omdbapi.com/?apikey=48004f8a&t=${title}&page=1`;
const MovieService = {
  //DATA MEMBERS
  movie: null,
  results: [],
  selectedID: null,
  

  // METHODS
  async searchAllMovies(search) {
    this.results = await fetch(MOVIE_SEARCH_API(search)).then((res) => res.json());

    document.dispatchEvent(new CustomEvent('movie-searched'));
  },

  async fetchByTitle(title) {
    return await fetch(MOVIE_API(title)).then((res) => res.json());
  },

  async select(imdbId) {
    this.selectedID = imdbId;
    this.movie = await this.fetchByTitle(this.selectedID);
    document.dispatchEvent(new CustomEvent('movie-selected'));
  },
};

(async () => {
  await MovieService.searchAllMovies('game');
  console.log(MovieService.results);
})();
