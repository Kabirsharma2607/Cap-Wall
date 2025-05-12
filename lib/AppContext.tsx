'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  username: string;
  setUsername: (value: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');

  return (
    <AppContext.Provider value={{ username , setUsername }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 