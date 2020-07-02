import { useState, useEffect } from 'react';
import { Record, useRecord, Doc } from '@model';

export type EncounterDoc = Doc<EncounterData>;

export class Encounter extends Record<EncounterData> {
  static collectionName = 'encounter';

  characters = [];

  get name() {
    return this.data.name;
  }

  addCharacter(data: any) {}

  nextTurn() {}
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
  return useRecord(Encounter, id);
}
