import { EncounterState, Character } from '@models/encounter';
import { useReducer, useEffect } from 'react';

/**
 * Actions
 *
 * - character:add
 * - reset
 */
type EncounterActions = AddCharacterAction | ResetAction;

interface AddCharacterAction {
  type: 'character:add';
  character: Character;
}

interface ResetAction {
  type: 'reset';
}

export function useEncounter() {
  const [state, dispatch] = useReducer<EncounterReducer, any>(
    (prev, action) => {
      if (action.type === 'reset') {
        return {
          characters: [],
        };
      }
      return {
        characters: [...prev.characters, action.character],
      };
    },
    null,
    () => {
      try {
        return JSON.parse(localStorage.getItem('encounter'));
      } catch {
        return DEFAULT_ENCOUNTER;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem('encounter', JSON.stringify(state));
  }, [state]);

  return {
    ...state,
    reset() {
      dispatch({
        type: 'reset',
      });
    },
    addCharacter(character: Character) {
      dispatch({
        type: 'character:add',
        character,
      });
    },
  };
}

/**
 * Reducers
 */
type EncounterReducer = (
  state: EncounterState,
  action: EncounterActions
) => EncounterState;

/**
 * DEFAULTS
 */
const DEFAULT_ENCOUNTER: EncounterState = {
  characters: [
    { name: 'Breaker Foolish', initiative: 9 },
    { name: 'Goblin', initiative: 12 },
  ],
};
