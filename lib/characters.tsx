import { collectionOfWatched } from '@collection-of-watched';
import { Collection } from 'babas';

export interface Character {
  id?: string;
  name: string;
  initMod: number;
}

export type CharacterCollection = Collection<Character>;

export function createCharacterCollection() {
  return collectionOfWatched<Character>('characters');
}
