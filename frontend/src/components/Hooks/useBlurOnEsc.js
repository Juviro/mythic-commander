export default event => {
  if (event.keyCode !== 27) return;
  event.target.blur();
};
