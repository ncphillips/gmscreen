import { watch, createCollection, Subscribable } from 'babas';
import { Encounter } from '@encounters';
import { Character } from '@characters';
import {
  EncounterCharacter,
  EncounterCharacterMethods,
} from '@encounter-characters';
import { uid } from '@uid';
import { D20 } from '@dice';

export const createDb = () => {
  const encounters = collectionOfWatched<Subscribable<Encounter>>('encounters');
  const characters = collectionOfWatched<Character>('characters');
  const encounterCharacters = createCollection<
    EncounterCharacter,
    EncounterCharacterMethods
  >(load('encounter-characters'), () => {
    return {
      add(encounter: Encounter, character: Character) {
        const ec: EncounterCharacter = {
          id: uid(),
          characterId: character.id,
          encounterId: encounter.id,
          initiative: character.initMod + D20.roll(),
        };

        encounterCharacters[ec.id] = ec;

        return ec;
      },
    };
  });
  encounterCharacters.subscribe((e) => save('encounter-characters', e));

  return {
    encounters,
    characters,
    encounterCharacters,
  };
};

function loadWatchedCollection(key: string) {
  const col = load(key);
  Object.keys(col).forEach((key) => {
    col[key] = watch(col[key]);
  });
  return col;
}

function collectionOfWatched<Entry>(key: string) {
  const collection = createCollection<Entry>(loadWatchedCollection(key));
  collection.subscribe((e) => save(key, e));
  return collection;
}

function collection<Entry>(key: string) {
  const collection = createCollection<Entry>(load(key));
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
