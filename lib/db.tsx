import { watch, createCollection, Subscribable, Collection } from 'babas';
import { Encounter } from '@encounters';
import { Character } from '@characters';
import {
  EncounterCharacter,
  EncounterCharacterMethods,
} from '@encounter-characters';
import { uid } from '@uid';
import { D20 } from '@dice';

export const createDb = () => {
  const encounters = collectionOfWatched<Encounter>('encounters');
  const characters = collectionOfWatched<Character>('characters');
  return {
    encounters,
    characters,
    encounterCharacters: createEncounterCharacters(characters),
  };
};

function createEncounterCharacters(characters: Collection<Character>) {
  const encounterCharacters = createCollection<
    EncounterCharacter,
    EncounterCharacterMethods
  >(load('encounter-characters'), (ec) => {
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
      findFor(encounter) {
        return encounterCharacters
          .toArray()
          .filter(({ encounterId }) => encounterId === encounter.id)
          .map(({ characterId, initiative }) => ({
            ...characters[characterId],
            initiative,
          }))
          .sort((a, b) => b.initiative - a.initiative);
      },
      nextActiveFor(encounter) {
        const characters = ec.findFor(encounter);
        const prev = characters.findIndex(
          ({ name }) => name === encounter.activeCharacter
        );
        const next = Math.floor((prev + 1) % characters.length);

        return characters[next];
      },
    };
  });

  encounterCharacters.subscribe((e) => save('encounter-characters', e));

  return encounterCharacters;
}

function loadWatchedCollection(key: string) {
  const col = load(key);
  Object.keys(col).forEach((key) => {
    col[key] = watch(col[key]);
  });
  return col;
}

function collectionOfWatched<Entry>(key: string) {
  const collection = createCollection<
    Subscribable<Entry>,
    WatchedMethods<Entry>
  >(loadWatchedCollection(key), (c) => ({
    add(id: string, data: Entry) {
      // @ts-ignore
      return (c[id] = watch<Entry>(data));
    },
  }));
  collection.subscribe((e) => save(key, e));
  return collection;
}

interface WatchedMethods<Entry> {
  add(id: string, entry: Entry): Subscribable<Entry>;
}

function collection<Entry>(key: string) {
  const collection = createCollection<Entry>(load(key));
  collection.subscribe((e) => save(key, e));
  return collection;
}

function load(key) {
  try {
    const a = JSON.parse(localStorage.getItem(key)) || {};
    return a;
  } catch {
    return {};
  }
}

function save(key: string, data: any) {
  const d = JSON.stringify(data);

  localStorage.setItem(key, d);
}
