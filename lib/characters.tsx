import { useState, useEffect, useContext } from 'react';
import { DbContext } from '@db-context';

export interface Character {
  id?: string;
  name: string;
  initMod: number;
  initiative?: number;
}

export function useCharacterCollection() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    db.characters.subscribe(forceRender);
  }, [db]);

  return db.characters;
}

export function useCharacter(id?: string) {
  return {};
}

function useForceRender() {
  const [, set] = useState(0);

  return () => set((i) => i + 1);
}
