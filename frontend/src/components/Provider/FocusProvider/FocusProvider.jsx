import React, { useState } from 'react';

const FocusContext = React.createContext({});

export const FocusContextProvider = ({ children }) => {
  const [focusedElements, setFocusedElements] = useState([]);

  const focusedElement = focusedElements[focusedElements.length - 1];

  const addFocus = newId => {
    if (!newId) return;
    const filteredElements = focusedElements.filter(id => id !== newId);
    setFocusedElements(filteredElements.concat(newId));
  };

  const removeFocus = idToRemove => {
    if (!idToRemove) return;
    const filteredElements = focusedElements.filter(id => id !== idToRemove);
    setFocusedElements(filteredElements);
  };

  return (
    <FocusContext.Provider
      value={{
        focusedElement,
        addFocus,
        removeFocus,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export default FocusContext;
