import { useState, useEffect } from 'react';
import { Model, useRecord } from '@model';

export class Character extends Model {
  static collectionName = 'character';

  public id: string;
  public name: string;
  public initMod: number;

  constructor(data: CharacterData, id?: string) {
    super();
    this.id = id;
    this.name = data.name;
    this.initMod = data.initMod;
  }

  static fromQuery(doc: any) {
    if (!doc.exists) return null;
    return new Character(doc.data(), doc.id);
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
  return useRecord(id);
}
