// Page Transitions!
const airplane = $('#airplane-img');
const mediaPlayer = $('.media__player');
const weatherApp = $('.weather__app');

let $LocoScroll = null;
let isShutDown = false;
document.addEventListener('route-update', (event) => {
  handleHomePageTransition(event.detail);
  handleMediaPageTransition(event.detail);
  handleWeatherPageTransition(event.detail);

  if ($LocoScroll) {
    return $LocoScroll.update();
  }

  $LocoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
  });
});

const handleHomePageTransition = ({ to, from }) => {
  if (from === 'Home') {
    airplane.fadeOut();
  }
  if (to === 'Home') {
    airplane.fadeIn();
  }
};
const handleMediaPageTransition = ({ to, from }) => {
  if (from === 'Media') {
    mediaPlayer.fadeOut();
  }
  if (to === 'Media') {
    mediaPlayer.fadeIn();
  }
};
const handleWeatherPageTransition = ({ to, from }) => {
  if (from === 'Weather') {
    weatherApp.fadeOut();
  }
  if (to === 'Weather') {
    weatherApp.fadeIn();
  }
};

const shutDownScreen = () => {
  if (!isShutDown) {
    $('.circle--clippath').css('clip-path', 'circle(150% at 0% 0%)');
    $('.power').css('color', 'white');
    MediaPlayer.$audio.pause();
    isShutDown = true;
  } else {
    $('.circle--clippath').css('clip-path', 'circle(0% at 0% 0%)');
    $('.power').css('color', 'var(--color-topicons');
    isShutDown = false;
  }
  setLS('shutdown', isShutDown);
};

const themeBtn = document.querySelector('.themebtn');
themeBtn.addEventListener('click', () => {
  setTimeout(() => {
    document.body.classList.toggle('bgdark');
    let isLight = document.body.classList.contains('bgdark');
    localStorage.setItem('darkTheme', isLight);
  }, 100);
});

// Save to Local Storage
const isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'));
if (isDarkTheme) {
  document.body.classList.add('bgdark');
}
