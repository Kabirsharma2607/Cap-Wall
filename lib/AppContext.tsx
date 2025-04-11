'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  passKey: string[] | null;
  setPassKey: (keys: string[] | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passKey, setPassKey] = useState<string[] | null>(null);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, passKey, setPassKey }}>
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