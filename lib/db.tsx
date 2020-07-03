import { watch, createCollection, Subscribable } from 'babas';
import { Encounter } from '@encounters';
import { Character } from '@characters';
import { createEncounterCharacters } from '@encounter-characters';
import { write, read } from '@storage';

export const createDb = () => {
  const encounters = collectionOfWatched<Encounter>('encounters');
  const characters = collectionOfWatched<Character>('characters');
  return {
    encounters,
    characters,
    encounterCharacters: createEncounterCharacters(characters),
  };
};

/**
 * COLLECTION OF WATCHED ITEMS
 */
function loadWatchedCollection(key: string) {
  const col = read(key);
  Object.keys(col).forEach((key) => {
    col[key] = watch(col[key]);
  });
  return col;
}

function collectionOfWatched<Entry>(key: string) {
  function syncOnItemChange(item: Subscribable<Entry>) {
    item.subscribe(() => {
      write(key, collection);
    });
  }

  const initialData = loadWatchedCollection(key);

  const collection = createCollection<
    Subscribable<Entry>,
    WatchedMethods<Entry>
  >(initialData, (collection) => ({
    add(id: string, data: Entry) {
      // @ts-ignore
      const item = (collection[id] = watch<Entry>(data));
      syncOnItemChange(item);
      return item;
    },
  }));

  collection.subscribe((data) => write(key, data.target));
  collection.toArray().forEach(syncOnItemChange);

  return collection;
}

interface WatchedMethods<Entry> {
  add(id: string, entry: Entry): Subscribable<Entry>;
}
