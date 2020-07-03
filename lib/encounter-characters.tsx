import { useEffect, useContext } from 'react';
import { DbContext } from '@db-context';
import { useForceRender } from '@use-force-render';
import { Encounter } from '@encounters';
import { Character, useCharacterCollection } from '@characters';

export interface EncounterCharacter {
  id: string;
  encounterId: string;
  characterId: string;
  initiative: number;
}

export interface EncounterCharacterMethods {
  add(encounter: Encounter, character: Character): EncounterCharacter;
  nextActiveFor(encounter: Encounter): Character;
  findFor(encounter: Encounter): (Character & { initiative: number })[];
}

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
