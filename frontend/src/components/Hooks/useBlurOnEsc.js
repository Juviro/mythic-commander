import keyCodes from '../../constants/keyCodes';

export default event => {
  if (event.keyCode !== keyCodes.ESC) return;
  event.target.blur();
};
