import { Encounter } from '@encounters';
import { Character } from '@characters';
import { Collection, createCollection } from 'babas';
import { uid } from '@uid';
import { D20 } from '@dice';
import { read, write } from '@storage';

export interface EncounterCharacter {
  id: string;
  encounterId: string;
  characterId: string;
  initiative: number;
}

export interface EncounterCharacterMethods {
  add(encounter: Encounter, character: Character): EncounterCharacter;
  nextActiveFor(encounter: Encounter): Character;
  findFor(encounter: Encounter): (Character & { initiative: number })[];
}

export function createEncounterCharacters(characters: Collection<Character>) {
  const encounterCharacters = createCollection<
    EncounterCharacter,
    EncounterCharacterMethods
  >(read('encounter-characters'), (ec) => {
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

  encounterCharacters.subscribe((data: any) =>
    write('encounter-characters', data)
  );

  return encounterCharacters;
}
