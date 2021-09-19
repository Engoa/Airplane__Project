(() => {
  const drawMediaController = () => {
    const mediaControllerTitle = document.querySelector('.media__controller--title');
    if (!mediaControllerTitle) return;
    mediaControllerTitle.innerHTML = `
    <a href="#Media">
      <span>${MediaPlayer.playingNow.title}</span>
  </a>
    `;

    
  };

  const drawMediaHeader = () => {
    const mediaHeader = document.querySelector('.render--media--header');
    if (!mediaHeader) return;
    mediaHeader.innerHTML = `
    <div
        class="page__header media__header ${
          MediaPlayer.playingNow.rtl ? 'page__header--rtl' : ''
        }"
        data-scroll
        data-scroll-speed="0.1"
        data-scroll-delay="0.5"
      >
        <div>
          <div class="media__header__album">
            <h1 id="fitty-title">${MediaPlayer.playingNow.title}</h1>
          </div>

          <div class="media__header__info">
            <span id="author--name">${MediaPlayer.playingNow.author}</span>
            <span>${MediaPlayer.songs.length} Songs</span>
          </div>
        </div>
      </div>
      `;

    fitty('#fitty-title', { multiLine: true, maxSize: 150, minSize: 80 });
  };

  const drawMediaCards = () => {
    const renderMediaCards = document.querySelector('.render--media--cards');
    MediaPlayer.songs.forEach((song, index) => {
      renderMediaCards.innerHTML += `
     <button type="button" class="songcard ${song.rtl ? 'songcard--rtl' : ''}" data-id="${
        song.id
      }" >
      <div class="media__content whitecard whitecard--small" onclick="MediaPlayer.toggle()"> 
        <div class="media__content--number">
          <span>${index + 1}</span>
        </div>
        <div class="media__content--name">
          <span id="name">${song.title}</span>
          <span id="author--name">${song.author}</span>
        </div>
        <div class="media__content--controller">
          <i class="fas fa-play playing" id='card-play' onclick="MediaPlayer.play()"></i>
          <i class="fas fa-pause paused" id='card-pause' onclick="MediaPlayer.pause()"></i>
        </div>
      </div>
    </button>
       
      `;
    });
  };

  const drawSelectedCard = () => {
    $(`.songcard.playing-now`).removeClass('playing-now');
    $(`.songcard[data-id=${MediaPlayer.selectedSong}]`).addClass('playing-now');
  };

  const drawMediaImage = () => {
    document.querySelector('.render--media--image').innerHTML = `
      <img
        class="media__player__album"
        src="${MediaPlayer.playingNow.cover_img}"
        alt="Album Image"
      />
    `;
  };

  // On Click change media player image

  drawMediaHeader();
  drawMediaCards();
  drawMediaImage();
  drawSelectedCard();
  drawMediaController();

  const mediaCard = document.querySelectorAll('.songcard');

  mediaCard.forEach((btn) =>
    btn.addEventListener('click', () => MediaPlayer.select(btn.dataset.id))
  );

  document.addEventListener('song-selected', () => {
    // On click update the header for the active song
    drawMediaHeader();
    drawMediaImage();
    drawSelectedCard();
    drawMediaController();
    $LocoScroll.update();
  });

  document.addEventListener('music-toggled', () => {
    $(`.songcard[data-id=${MediaPlayer.lastPlayed}] .playing`).show();
    $(`.songcard[data-id=${MediaPlayer.lastPlayed}] .paused`).hide();

    if (MediaPlayer.isPlaying) {
      $('.icon-played').hide();
      $('.icon-paused').show();

      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .playing`).hide();
      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .paused`).show();
    } else {
      $('.icon-paused').hide();
      $('.icon-played').show();

      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .playing`).show();
      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .paused`).hide();
    }
  });

  $LocoScroll.update();
})();
