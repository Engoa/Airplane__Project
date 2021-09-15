// Page Transitions!
const airplane = $('#airplane-img');
const mediaPlayer = $('.media__player');

document.addEventListener('route-update', (event) => {
  handleHomePageTransition(event.detail);
  handleMediaPageTransition(event.detail);
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
