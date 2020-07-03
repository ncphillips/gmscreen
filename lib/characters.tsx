import { useState, useEffect, useContext } from 'react';
import { DbContext } from '@db-context';
import { useForceRender } from '@use-force-render';

export interface Character {
  id?: string;
  name: string;
  initMod: number;
}

export function useCharacterCollection() {
  const forceRender = useForceRender();
  const db = useContext(DbContext);

  useEffect(() => db.characters.subscribe(forceRender), [db]);

  return db.characters;
}
