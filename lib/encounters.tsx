import { useState, useEffect, useContext } from 'react';
import { DbContext } from '@db-context';

export interface Encounter {
  id?: string;
  name: string;
  characters: string[];
}

export function useEncounterCollection() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    db.encounters.subscribe(forceRender);
  }, [db]);

  return db.encounters;
}

export function useEncounter(id?: string) {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    const e = db.encounters[id];
    if (e) {
      e.subscribe(forceRender);
    }
  }, [db]);

  return db.encounters[id];
}

function useForceRender() {
  const [, set] = useState(0);

  return () => set((i) => i + 1);
}
