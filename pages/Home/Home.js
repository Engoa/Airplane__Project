(() => {
  const drawHomeMediaCard = () => {
    const drawHomeCard = document.querySelector('.render--homecard-media');
    drawHomeCard.innerHTML = `
    <a href="#Media" class='card--anchor'> 
    <div class="homecards__weather__temperature homecards__media" >
        <div class="homecards__weather__degrees" id='card-media'>
          <div>
            <h2 class="degree movie--name" id='fitty-title2'>${MediaPlayer.playingNow.title}</h2>
          </div>
          <div>
            <span class="degree--description movie--duration">${MediaPlayer.songs.length} Songs</span>
          </div>
          <div>
            <i class="fas fa-headphones card--icon"></i>
          </div>
        </div>
        <div class="homecards__weather__image homecards__movies--image" id='card--img'>
          <img src='${MediaPlayer.playingNow.cover_img}' alt="temperature image" />
        </div>
      </div>
  </a>
          `;
    fitty('#fitty-title2', { multiLine: true });
  };

  drawHomeMediaCard();
})();
