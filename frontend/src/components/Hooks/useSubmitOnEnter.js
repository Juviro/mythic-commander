import keyCodes from '../../constants/keyCodes';

export default (onSubmit) => (event) => {
  if (event.keyCode !== keyCodes.ENTER || !onSubmit) return;
  onSubmit();
};
