import { useForceRender } from '@use-force-render';
import { useContext, useEffect } from 'react';
import { DbContext } from '@db-context';
import { Encounter } from '@encounters';

export function useEncounterCharacters() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    db.encounterCharacters.subscribe(forceRender);
  }, [db]);

  return db.encounterCharacters;
}

export function useCharactersInEncounter(encounter: Encounter) {
  const encounterCharacters = useEncounterCharacters();

  if (!encounter) return [];

  return encounterCharacters.findFor(encounter);
}
