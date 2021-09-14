// Page Transitions!
const airplane = $('#airplane-img');

document.addEventListener('route-update', (event) => {
  handleHomePageTransition(event.detail);
});

const handleHomePageTransition = ({ to, from }) => {
  if (from === 'Home') {
    airplane.fadeOut();
  }
  if (to === 'Home') {
    airplane.fadeIn();
  }
};
