/* eslint-disable */
import React from 'react';
import useShortcutFocus from '../../../Hooks/useShortcutFocus';

interface Props {
  children: React.ReactNode;
  focusId: string;
  visible?: boolean;
  style?: React.CSSProperties;
}

export default ({ children, focusId, visible, style }: Props) => {
  return <>{children}</>;
  const onClick = useShortcutFocus(focusId, visible);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={style}
    >
      {children}
    </div>
  );
};
