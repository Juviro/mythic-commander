import { useContext, useEffect } from 'react';
import FocusContext from '../Provider/FocusProvider/FocusProvider';

export default (focusId, visible = true) => {
  const { addFocus, removeFocus } = useContext(FocusContext);

  useEffect(() => {
    if (!visible) {
      removeFocus(focusId);
    } else {
      addFocus(focusId);
    }

    return () => removeFocus(focusId);
    // eslint-disable-next-line
  }, [visible]);

  const onClick = () => {
    addFocus(focusId);
  };

  return onClick;
};
