const MediaPlayer = {
  // DATA MEMBERS
  $audio: document.querySelector('audio'),
  isPlaying: false,
  loop: false,
  mute: false,
  lastPlayed: null,
  selectedSong: null,
  songs: [],
  itunes: {},

  // GETTERS
  get currentIndex() {
    const index = this.songs.findIndex((s) => s.id === this.selectedSong);
    return index > -1 ? index : 0;
  },

  get playingNow() {
    return this.getSongById(this.selectedSong);
  },

  // METHODS
  getSongById(id) {
    return this.songs.find((song) => song.id === id);
  },

  async select(id) {
    if (id === this.selectedSong) return;
    this.lastPlayed = this.selectedSong;
    this.selectedSong = id;
    await this.loadSong(this.playingNow.itunes_id);
    this.play();
    this.toggle(true, true);
    document.dispatchEvent(new CustomEvent('song-selected'));
    setLS('selected-song', this.selectedSong);
  },

  toggle(state, silent) {
    if (!silent) {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }
    this.isPlaying = state ?? !this.isPlaying;

    document.dispatchEvent(new CustomEvent('music-toggled'));
  },
  adjustVolume(e) {
    const { value } = e.target;
    this.$audio.volume = value / 100;
  },

  seek(e) {
    const { value } = e.target;
    this.$audio.currentTime = value / 10;
  },

  toggleMute(state) {
    this.mute = state ?? !this.mute;
    this.$audio.muted = this.mute;
    if (this.mute) {
      $('.volume').addClass('mute-selected');
    } else {
      $('.volume').removeClass('mute-selected');
    }
    setLS('user-muted', this.mute);
  },

  toggleLoop() {
    const repeatElement = document.querySelector('.repeat');
    this.loop = !this.loop;
    if (this.loop) {
      repeatElement.style.color = 'var(--color-red)';
      this.$audio.loop = this.loop;
    } else {
      repeatElement.style.color = 'var(--color-main)';
      this.$audio.loop = !this.loop;
    }
  },

  play() {
    this.$audio.play();
  },

  pause() {
    this.$audio.pause();
  },

  nextSong() {
    const nextSong = this.songs[this.currentIndex + 1];
    if (nextSong) {
      this.select(nextSong.id);
    } else {
      this.select(this.songs[0].id);
    }
  },

  previousSong() {
    const prevSong = this.songs[this.currentIndex - 1];
    if (prevSong) {
      this.select(prevSong.id);
    } else {
      const lastSong = this.songs[this.songs.length - 1];
      this.select(lastSong.id);
    }
  },

  async loadSong(id) {
    let song = null;
    if (this.itunes[id]) {
      song = this.itunes[id];
    } else {
      song = await this.fetchLookup(id);
      this.itunes[id] = song;
    }

    this.$audio.querySelector('source').src = song.previewUrl;
    this.$audio.load();
  },

  // Init all songs from json file
  async fetchAllSongs() {
    this.songs = await fetch('../assets/jsons/songs.json').then((res) => res.json());
    if (getLS('selected-song')) {
      this.selectedSong = getLS('selected-song');
    } else {
      this.selectedSong = this.songs[0].id;
    }

    await this.loadSong(this.playingNow.itunes_id);
    this.$audio.volume = 0.25;
    this.$audio.addEventListener('timeupdate', () => {
      document.querySelector('.slider__seek').value = Math.floor(this.$audio.currentTime * 10);

      if (this.$audio.currentTime === this.$audio.duration) {
        this.nextSong();
      }
    });
  },
  fetchLookup(id) {
    const url = `https://itunes.apple.com/us/lookup?id=${id}&entity=album`;
    return Promise.resolve(
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

        },
      })
        .then((res) => res.json())
        .then((data) => data.results[0])
    );
  },
};

(async () => {
  await MediaPlayer.fetchAllSongs();
  //Save Mute to LS
  if (getLS('user-muted')) {
    MediaPlayer.toggleMute(getLS('user-muted'));
  }

  //Save Shutdown to LS
  if (getLS('shutdown')) {
    shutDownScreen(getLS('shutdown'));
  }
})();
