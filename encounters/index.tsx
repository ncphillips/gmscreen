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
    firestore()
      .collection('encounter')
      .onSnapshot((query) => {
        const data = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setEncounters({
          loading: false,
          data,
          error: null,
        });
      });
  }, []);

  return encounters;
}
