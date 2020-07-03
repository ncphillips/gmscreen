import { useState, useEffect, useContext } from 'react';
import { DbContext } from '@db-context';

export interface EncounterCharacter {
  id: string;
  encounterId: string;
  characterId: string;
  initiative: number;
}

export function useEncounterCharacters() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    db.encounterCharacters.subscribe(forceRender);
  }, [db]);

  return db.encounterCharacters;
}

function useForceRender() {
  const [, set] = useState(0);

  return () => set((i) => i + 1);
}
