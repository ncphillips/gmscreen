import { watch, createCollection, Subscribable } from 'babas';
import { Encounter } from '@encounters';
import { Character } from '@characters';
import { EncounterCharacter } from '@encounter-characters';

export const createDb = () => {
  return watch({
    encounters: collectionOfWatched<Subscribable<Encounter>>('encounters'),
    characters: collectionOfWatched<Character>('characters'),
    encounterCharacters: collection<EncounterCharacter>('encounter-characters'),
  });
};

function collectionOfWatched<T>(key: string) {
  const col = load(key);
  Object.keys(col).forEach((key) => {
    col[key] = watch(col[key]);
  });

  const collection = createCollection<T>(col);
  collection.subscribe((e) => save(key, e));
  return collection;
}

function collection<T>(key: string) {
  const collection = createCollection<T>(load(key));
  collection.subscribe((e) => save(key, e));
  return collection;
}

function load(key) {
  try {
    const a = JSON.parse(localStorage.getItem(key)) || {};
    console.log(a);
    return a;
  } catch {
    return {};
  }
}

function save(key: string, data: any) {
  const d = JSON.stringify(data);

  console.log({ d });
  localStorage.setItem(key, d);
}
