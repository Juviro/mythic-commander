import React, { useMemo, useState } from 'react';

const FocusContext = React.createContext({
  focusedElement: undefined,
  focusedElements: [],
  // eslint-disable-next-line
  addFocus: (_id: string) => {},
  // eslint-disable-next-line
  removeFocus: (_id: string) => {},
  // eslint-disable-next-line
  setFocus: (_ids: string[]) => {},
});

export const FocusContextProvider = ({ children }) => {
  const [focusedElements, setFocusedElements] = useState<string[]>([]);

  const focusedElement = focusedElements[focusedElements.length - 1];

  const addFocus = (newId: string) => {
    if (!newId) return;
    const filteredElements = focusedElements.filter((id) => id !== newId);
    setFocusedElements(filteredElements.concat(newId));
  };

  const removeFocus = (idToRemove: string) => {
    if (!idToRemove) return;
    const filteredElements = focusedElements.filter((id) => id !== idToRemove);
    setFocusedElements(filteredElements);
  };

  const value = useMemo(
    () => ({
      focusedElement,
      focusedElements,
      addFocus,
      removeFocus,
      setFocus: setFocusedElements,
    }),
    [focusedElement]
  );

  return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>;
};

export default FocusContext;
