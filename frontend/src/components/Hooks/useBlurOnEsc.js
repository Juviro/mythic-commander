import keyCodes from '../../constants/keyCodes';

export default event => {
  if (event.keyCode !== keyCodes.ESCAPE) return;
  event.target.blur();
};
