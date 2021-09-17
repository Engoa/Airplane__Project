// Page Transitions!
const airplane = $('#airplane-img');
const mediaPlayer = $('.media__player');

let $LocoScroll = null;

document.addEventListener('route-update', (event) => {
  handleHomePageTransition(event.detail);
  handleMediaPageTransition(event.detail);

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

