import { useEffect, useContext } from 'react';
import { DbContext } from '@db-context';
import { useForceRender } from '@use-force-render';
import { Encounter } from '@encounters';
import { Character } from '@characters';
import { Collection } from 'babas';
import { D20 } from '@dice';
import { uid } from '@uid';

export interface EncounterCharacter {
  id: string;
  encounterId: string;
  characterId: string;
  initiative: number;
}

export interface EncounterCharacterMethods {
  add(encounter: Encounter, character: Character): EncounterCharacter;
}

export function useEncounterCharacters() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    db.encounterCharacters.subscribe(forceRender);
  }, [db]);

  return db.encounterCharacters;
}
