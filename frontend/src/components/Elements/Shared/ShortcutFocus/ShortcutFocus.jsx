import React from 'react';
import useShortcutFocus from '../../../Hooks/useShortcutFocus';

export default ({ children, focusId, visible, style }) => {
  return (
    <div onClick={useShortcutFocus(focusId, visible)} style={style}>
      {children}
    </div>
  );
};
