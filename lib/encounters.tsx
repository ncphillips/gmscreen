import { collectionOfWatched } from '@collection-of-watched';
import { Collection } from 'babas';

export interface Encounter {
  id?: string;
  name: string;
  activeCharacter?: string;
}

export type EncountCollection = Collection<Encounter>;

export function createEncounterCollection() {
  return collectionOfWatched<Encounter>('encounters');
}
