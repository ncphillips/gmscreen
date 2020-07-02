import { useState, useEffect } from 'react';
import { Record, useRecord, Doc } from '@model';
import { D20 } from '@dice';

export type CharacterDoc = Doc<CharacterData>;

export class Character extends Record {
  static collectionName = 'character';

  private data: CharacterData;

  private constructor() {
    super();
  }

  get name() {
    return this.data.name;
  }

  get initMod() {
    return this.data.initMod;
  }

  static fromDoc(doc: CharacterDoc) {
    if (!doc.exists) return null;
    const character = new Character();
    character.doc = doc;
    character.data = doc.data();
    return character;
  }

  static create(data: CharacterData) {
    return super.create({
      ...data,
      initiative: D20.roll() + data.initMod,
    });
  }
}

interface CharacterData {
  name: string;
  initMod: number;
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
    Character.all().then((data) => {
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
  return useRecord(id);
}
