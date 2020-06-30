import { EncounterState, Character } from '@models/encounter';
import { useReducer, useEffect } from 'react';

/**
 * Actions
 *
 * - character:add
 * - reset
 */
type EncounterActions = AddCharacterAction | ResetAction | NextRoundAction;

interface AddCharacterAction {
  type: 'character:add';
  character: Character;
}

interface ResetAction {
  type: 'reset';
}

interface NextRoundAction {
  type: 'activeCharacter:next';
}

export function useEncounter() {
  const [state, dispatch] = useReducer<EncounterReducer, any>(
    (prev, action) => {
      if (action.type === 'reset') {
        return {
          ...prev,
          activeCharacter: '',
          characters: [],
        };
      }

      if (action.type === 'activeCharacter:next') {
        if (!prev.characters.length) return prev;
        const currentIndex = prev.characters.findIndex(
          (character) => character.name === prev.activeCharacter
        );
        const nextIndex = (currentIndex + 1) % prev.characters.length;

        return {
          ...prev,
          activeCharacter: prev.characters[nextIndex].name,
        };
      }

      if (action.type === 'character:add') {
        if (
          prev.characters.find(
            (character) => character.name === action.character.name
          )
        ) {
          return prev; // Don't add duplicates
        }
        return {
          ...prev,
          characters: [...prev.characters, action.character],
        };
      }
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
    nextTurn() {
      dispatch({
        type: 'activeCharacter:next',
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
  activeCharacter: '',
  characters: [],
};
