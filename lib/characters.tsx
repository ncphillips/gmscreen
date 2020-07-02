import { useState, useEffect } from 'react';
import { Record, useRecord, Doc } from '@model';

export type CharacterDoc = Doc<CharacterData>;

export class Character extends Record {
  static collectionName = 'character';

  public name: string;
  public initMod: number;

  constructor(data: CharacterData, doc?: CharacterDoc) {
    super();
    this.doc = doc;
    this.name = data.name;
    this.initMod = data.initMod;
  }

  static fromDoc(doc: CharacterDoc) {
    if (!doc.exists) return null;
    return new Character(doc.data(), doc);
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
