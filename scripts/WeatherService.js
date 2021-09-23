// API for Weather
const WEATHER_API_KEY = 'a505effdf68e5b04fa5eb42d16b7374c';
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const FALLBACK_LOCATION_API_URL = 'https://geolocation-db.com/json/';
const wApiLink = (path) => `${WEATHER_API_BASE_URL}${path}&appid=${WEATHER_API_KEY}`;

const WeatherService = {
  //DATA MEMBERS
  data: null,
  userCoords: null,

  // METHODS
  // Returns promise with user coords
  getUserLocation() {
    return new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
        () => {
          fetch(FALLBACK_LOCATION_API_URL)
            .then((res) => res.json())
            .then(({ latitude, longitude }) => resolve({ latitude, longitude }))
            .catch(() => resolve());
        }
      )
    );
  },

  fetchByLocation() {
    const url = wApiLink(
      `onecall?lat=${this.userCoords.latitude}&lon=${this.userCoords.longitude}&exclude=hourly,minutely&units=metric`
    );

    return fetch(url).then((res) => res.json());
  },

  async init() {
    if (getLS('current-weather')) {
      this.data = getLS('current-weather');
    } else {
      this.userCoords = await this.getUserLocation();
      this.data = await this.fetchByLocation();

      setLS('current-weather', this.data);
    }
    setLS('current-weather', this.data);
    // function getWithExpiry(key) {
    //   const itemStr = localStorage.getItem('current-weather');
    //   // if the item doesn't exist, return null
    //   if (!itemStr) {
    //     return null;
    //   }
    //   const item = JSON.parse(itemStr);
    //   const now = new Date();
    //   // compare the expiry time of the item with the current time
    //   if (now.getTime() > item.expiry) {
    //     // If the item is expired, delete the item from storage
    //     // and return null
    //     localStorage.removeItem('current-weather');
    //     return null;
    //   }
    //   return item.value;
    // }

    // KEEP LAST
    document.dispatchEvent(new CustomEvent('on-weather-init'));
  },
};

(async () => {
  await WeatherService.init();
})();
