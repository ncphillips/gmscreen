export interface Character {
  id?: string;
  name: string;
  initMod: number;
}

export function createCharacterCollection() {
  return collectionOfWatched<Character>('characters');
}
