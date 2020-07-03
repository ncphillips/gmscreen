import { collectionOfWatched } from '@collection-of-watched';

export interface Encounter {
  id?: string;
  name: string;
  activeCharacter?: string;
}

export function createEncounterCollection() {
  return collectionOfWatched('encounters');
}
