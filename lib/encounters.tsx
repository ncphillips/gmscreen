import { useState, useEffect } from 'react';
import { Model, useRecord } from '@model';

export class Encounter extends Model {
  static collectionName = 'encounter';

  public id: string;
  public name: string;

  constructor(data: EncounterData, id?: string) {
    super();
    this.name = data.name;
    this.id = id;
  }

  characters = [];

  addCharacter(data: any) {}

  nextTurn() {}

  static fromQuery(doc: any) {
    if (!doc.exists) return null;
    return new Encounter(doc.data(), doc.id);
  }
}

interface EncounterData {
  name: string;
}

/**
 * Opens a live connection to the Encounters collection.
 */
export function useEncounterCollection() {
  const [encounters, setEncounters] = useState({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    Encounter.all((data) => {
      setEncounters({
        loading: false,
        data,
        error: null,
      });
    });
  }, []);

  return encounters;
}

export function useEncounter(id?: string) {
  return useRecord(id);
}
