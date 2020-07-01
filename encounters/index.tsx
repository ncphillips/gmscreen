import { useState, useEffect } from 'react';
import { firestore } from 'firebase/app';

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
  const [encounters, setEncounters] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!id) return;
    Encounter.findById(id, (data) => {
      setEncounters({
        loading: false,
        data,
        error: null,
      });
    });
  }, [id]);

  return encounters;
}

export class Encounter {
  public id: string;
  public name: string;

  constructor(data: EncounterData, id?: string) {
    this.name = data.name;
    this.id = id;
  }

  delete() {
    firestore().collection('encounter').doc(this.id).delete();
  }

  static create(data: EncounterData) {
    return Encounter.collection.add(data);
  }

  static get collection() {
    return firestore().collection('encounter');
  }

  static findById(id: string, callback: (encounters: Encounter) => void) {
    this.collection.doc(id).onSnapshot((query) => {
      callback(Encounter.fromQuery(query));
    });
  }

  static all(callback: (encounters: Encounter[]) => void) {
    firestore()
      .collection('encounter')
      .onSnapshot((query) => {
        const encounters = query.docs.map(Encounter.fromQuery);

        callback(encounters);
      });
  }

  static fromQuery(doc: any) {
    if (!doc.exists) return null;
    return new Encounter(doc.data(), doc.id);
  }
}

interface EncounterData {
  name: string;
}
