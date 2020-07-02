import { useState, useEffect } from 'react';
import { Record, useRecord, Doc } from '@model';
import { D20 } from '@dice';

export type CharacterDoc = Doc<CharacterData>;

export class Character extends Record<CharacterData> {
  static collectionName = 'character';

  get name() {
    return this.data.name;
  }

  get initMod() {
    return this.data.initMod;
  }

  rollInitiative() {
    this.data.initiative = this.initMod + D20.roll();
  }
}

interface CharacterData {
  name: string;
  initMod: number;
  initiative?: number;
}

/**
 * Opens a live connection to the Characters collection.
 */
export function useCharacterCollection() {
  const [characters, setCharacters] = useState({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    Character.all((data) => {
      setCharacters({
        loading: false,
        data,
        error: null,
      });
    });
  }, []);

  return characters;
}

export function useCharacter(id?: string) {
  return useRecord(Character, id);
}
