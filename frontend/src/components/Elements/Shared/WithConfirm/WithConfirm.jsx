import React, { useState } from 'react';
import Confirm from '../Confirm';

export default ({ children, ...confirmProps }) => {
  const [isOpen, toggleIsOpen] = useState(false);

  return (
    <div onClick={toggleIsOpen}>
      {children}
      {isOpen && <Confirm {...confirmProps} />}
    </div>
  );
};
