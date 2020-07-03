import { createEncounterCollection } from '@encounters';
import { createCharacterCollection } from '@characters';
import { createEncounterCharacters } from '@encounter-characters';

export const createDb = () => {
  const encounters = createEncounterCollection();
  const characters = createCharacterCollection();
  const encounterCharacters = createEncounterCharacters(characters);

  return {
    encounters,
    characters,
    encounterCharacters,
  };
};
