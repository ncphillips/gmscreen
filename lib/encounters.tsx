import { useState, useEffect } from 'react';
import { Record, useRecord, Doc } from '@model';

export type EncounterDoc = Doc<EncounterData>;

export class Encounter extends Record {
  static collectionName = 'encounter';

  public name: string;

  constructor(data: EncounterData, doc?: EncounterDoc) {
    super();
    this.name = data.name;
    this.doc = doc;
  }

  characters = [];

  addCharacter(data: any) {}

  nextTurn() {}

  static fromDoc(doc: Doc<EncounterData>) {
    if (!doc.exists) return null;
    return new Encounter(doc.data(), doc);
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
    Encounter.all().then((data) => {
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
  return useRecord(Encounter, id);
}
