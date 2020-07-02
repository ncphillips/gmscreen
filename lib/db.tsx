import { watch, createCollection, Subscribable } from 'babas';
import { Encounter } from '@encounters';
import { Character } from '@characters';

export const createDb = () => {
  return watch({
    encounters: createSyncCollection<Subscribable<Encounter>>('encounters'),
    characters: createSyncCollection<Character>('characters'),
  });
};

function createSyncCollection<T>(key: string) {
  const col = load(key);
  Object.keys(col).forEach((key) => {
    col[key] = watch(col[key]);
  });

  const collection = createCollection<T>(col);
  collection.subscribe((e) => save(key, e));
  return collection;
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

function save(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
