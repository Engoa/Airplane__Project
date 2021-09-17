(() => {
  const drawHomeMediaCard = () => {
    const drawHomeCard = document.querySelector('.render--homecard-media');
    drawHomeCard.innerHTML = `
    <a href="#Media" class="card--anchor">
  <div class="homecards__card__data homecards__media">
    <div class="homecards__card__text" id="card-media">
      <div class='mediacard--header--container'>
        <h2 class="degree movie--name" id="fitty-title2">${MediaPlayer.playingNow.title}</h2>
       
      </div>
      <div>
        <span class="title--description movie--duration"
          >${MediaPlayer.songs.length} Songs</span
        >
      </div>
      <div>
        <i class="fas fa-headphones card--icon"></i>
      </div>
    </div>
    <div class="homecards__card__image homecards__movies--image card--media--img">
      <img src="${MediaPlayer.playingNow.cover_img}" alt="music image" />
       <div class="boxContainer">
          <div class="box box1"></div>
          <div class="box box2"></div>
          <div class="box box3"></div>
          <div class="box box4"></div>
          <div class="box box5"></div>
        </div>
    </div>
  </div>
</a>

          `;
    fitty('#fitty-title2', { multiLine: true });
  };

  drawHomeMediaCard();
})();
