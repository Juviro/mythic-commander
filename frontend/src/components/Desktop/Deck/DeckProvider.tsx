import { useToggle } from 'components/Hooks';
import React, { useMemo } from 'react';

const DeckContext = React.createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => undefined,
});

export const DeckContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useToggle();

  const value = useMemo(() => ({ isSidebarOpen, setIsSidebarOpen }), [isSidebarOpen]);

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};

export default DeckContext;
