import { useState, useEffect, useContext } from 'react';
import { DbContext } from '@db-context';
import { useForceRender } from '@use-force-render';

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
