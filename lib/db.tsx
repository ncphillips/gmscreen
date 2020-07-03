import { Encounter } from '@encounters';
import { Character } from '@characters';
import { createEncounterCharacters } from '@encounter-characters';
import { collectionOfWatched } from '@collection-of-watched';

export const createDb = () => {
  const encounters = collectionOfWatched<Encounter>('encounters');
  const characters = collectionOfWatched<Character>('characters');
  return {
    encounters,
    characters,
    encounterCharacters: createEncounterCharacters(characters),
  };
};
