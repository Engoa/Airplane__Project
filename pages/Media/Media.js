(() => {
  const drawMediaHeader = () => {
    document.querySelector('.render--media--header').innerHTML = `
      <div
        class="page__header media__header"
        data-scroll
        data-scroll-speed="2"
        data-scroll-delay="0.1"
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

    fitty('#fitty-title', { multiLine: true, maxSize: 115 });
  };

  const drawMediaCards = () => {
    const renderMediaCards = document.querySelector('.render--media--cards');
    MediaPlayer.songs.forEach((song, index) => {
      renderMediaCards.innerHTML += `
     <button type="button" class='songcard' data-id="${song.id}">
      <div class="media__content whitecard--small">
        <div class="media__content--number">
          <span>${index + 1}</span>
        </div>
        <div class="media__content--name">
          <span id="name">${song.title}</span>
          <span id="author--name">${song.author}</span>
        </div>
        <div class="media__content--controller">
          <i class="fas fa-play playing" id='card-play' onclick="MediaPlayer.toggle()"></i>
          <i class="fas fa-pause paused" id='card-pause' onclick="MediaPlayer.toggle()"></i>
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

  const mediaCard = document.querySelectorAll('.songcard');
  const mediaControllers = document.querySelectorAll('.media__content--controller');

  mediaCard.forEach((btn) =>
    btn.addEventListener('click', () => MediaPlayer.select(btn.dataset.id))
  );

  document.addEventListener('song-selected', () => {
    // On click update the header for the active song
    drawMediaHeader();
    drawMediaImage();
    drawSelectedCard();
    $LocoScroll.update();
  });

  document.addEventListener('music-toggled', () => {
    $(`.songcard[data-id=${MediaPlayer.lastPlayed}] .playing`).show();
    $(`.songcard[data-id=${MediaPlayer.lastPlayed}] .paused`).hide();

    if (MediaPlayer.isPlaying) {
      $('#icon-played').hide();
      $('#icon-paused').show();

      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .playing`).hide();
      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .paused`).show();
    } else {
      $('#icon-paused').hide();
      $('#icon-played').show();

      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .playing`).show();
      $(`.songcard[data-id=${MediaPlayer.selectedSong}] .paused`).hide();
    }
  });

  $LocoScroll.update();
})();
