'use client'
import React, { createContext, useContext, useState } from 'react';

interface PartyModeContextType {
  partyMode: boolean;
  setPartyMode: (value: boolean) => void;
}

const PartyModeContext = createContext<PartyModeContextType | undefined>(undefined);

export function PartyModeProvider({ children }: { children: React.ReactNode }) {
  const [partyMode, setPartyMode] = useState(false);

  return (
    <PartyModeContext.Provider 
      value={{ 
        partyMode, 
        setPartyMode
      }}
    >
      {children}
    </PartyModeContext.Provider>
  );
}

export function usePartyMode() {
  const context = useContext(PartyModeContext);
  if (context === undefined) {
    throw new Error('usePartyMode must be used within a PartyModeProvider');
  }
  return context;
}
