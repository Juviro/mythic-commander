import React from 'react';
import useShortcutFocus from '../../../Hooks/useShortcutFocus';

interface Props {
  children: React.ReactNode;
  focusId: string;
  visible?: boolean;
  style?: React.CSSProperties;
}

export default ({ children, focusId, visible, style }: Props) => {
  return (
    <div onClick={useShortcutFocus(focusId, visible)} style={style}>
      {children}
    </div>
  );
};
