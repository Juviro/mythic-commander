import { useContext, useEffect } from 'react';
import FocusContext from '../Provider/FocusProvider/FocusProvider';

export default (focusId, isActive = true) => {
  const { addFocus, removeFocus } = useContext(FocusContext);

  useEffect(() => {
    if (!isActive) {
      removeFocus(focusId);
    } else {
      addFocus(focusId);
    }

    return () => removeFocus(focusId);
    // eslint-disable-next-line
  }, [isActive]);

  const onClick = event => {
    event.preventDefault();
    addFocus(focusId);
  };

  return onClick;
};
