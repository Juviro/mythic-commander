import { useToggle } from 'components/Hooks';
import React from 'react';

const DeckContext = React.createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => undefined,
});

export const DeckContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useToggle();

  return (
    <DeckContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckContext;
