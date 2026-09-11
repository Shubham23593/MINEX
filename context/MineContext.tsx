'use client';

import React, { createContext, useContext, useState } from 'react';
import { Mine } from '@/lib/types';
import { MOCK_MINES } from '@/lib/mock/mines';

interface MineContextType {
  mines: Mine[];
  selectedMine: Mine;
  setSelectedMine: (mine: Mine) => void;
  selectMineById: (id: string) => void;
}

const MineContext = createContext<MineContextType | undefined>(undefined);

export function MineProvider({ children }: { children: React.ReactNode }) {
  const [mines] = useState<Mine[]>(MOCK_MINES);
  const [selectedMine, setSelectedMine] = useState<Mine>(MOCK_MINES[0]);

  const selectMineById = (id: string) => {
    const found = mines.find((m) => m.id === id);
    if (found) {
      setSelectedMine(found);
    }
  };

  return (
    <MineContext.Provider
      value={{
        mines,
        selectedMine,
        setSelectedMine,
        selectMineById,
      }}
    >
      {children}
    </MineContext.Provider>
  );
}

export function useMine() {
  const context = useContext(MineContext);
  if (!context) {
    throw new Error('useMine must be used within a MineProvider');
  }
  return context;
}
