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
}

export function useEncounterCharacters() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => {
    db.encounterCharacters.subscribe(forceRender);
  }, [db]);

  return db.encounterCharacters;
}

export function useCharactersInEncounter(encounter: Encounter): Characters {
  const characterCollection = useCharacterCollection();
  const encounterCharacters = useEncounterCharacters();

  if (!encounter) return [];
  const characters: Characters = encounterCharacters
    .toArray()
    .filter(({ encounterId }) => encounterId === encounter.id)
    .map(({ characterId, initiative }) => ({
      ...characterCollection[characterId],
      initiative,
    }))
    .sort((a, b) => b.initiative - a.initiative);

  characters.getNextActive = () => {
    const prev = characters.findIndex(
      ({ name }) => name === encounter.activeCharacter
    );
    const next = Math.floor((prev + 1) % characters.length);

    return characters[next];
  };

  return characters;
}

interface Characters extends Array<Character & { initiative: number }> {
  getNextActive?(): Character;
}
