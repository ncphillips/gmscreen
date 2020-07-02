import { useState, useEffect } from 'react';

/**
 * Opens a live connection to the Encounters collection.
 */
export function useEncounterCollection() {
  const [encounters, setEncounters] = useState({
    loading: true,
    error: null,
    data: [],
  });

  return encounters;
}

export function useEncounter(id?: string) {
  return {};
}
