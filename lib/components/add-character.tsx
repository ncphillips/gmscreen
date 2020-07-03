import { useRef } from 'react';
import { useCharacterCollection } from '@react-characters';
import { useEncounterCharacters } from '@react-encounter-characters';

export function AddCharacterForm({ encounter }: { encounter }) {
  const encounterCharacters = useEncounterCharacters();
  const characters = useCharacterCollection();
  const nameRef = useRef<HTMLInputElement>();
  const initModRef = useRef<HTMLInputElement>();
  const hpMaxRef = useRef<HTMLInputElement>();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = nameRef.current.value;
          const initMod = ~~initModRef.current.value;
          const hpMax = ~~hpMaxRef.current.value;
          if (name) {
            const character = characters.add(name, {
              id: name,
              name,
              initMod,
              hpMax,
              hpCurrent: hpMax,
            });

            encounterCharacters.add(encounter, character);
          }
        }}
      >
        <label htmlFor='add-character-name'>
          Name: <input id='add-character-name' ref={nameRef} />
        </label>
        <label htmlFor='add-character-initiative-mod'>
          Init Mod:{' '}
          <input
            id='add-character-initiative-mod'
            ref={initModRef}
            type='number'
            defaultValue={0}
            step={1}
          />
        </label>
        <label htmlFor='add-character-hp-max'>
          HP:{' '}
          <input
            id='add-character-hp-max'
            ref={hpMaxRef}
            type='number'
            defaultValue={8}
            step={1}
            min={1}
          />
        </label>
        <div>
          <input
            id='add-character-submit'
            type='submit'
            value='Add Character'
          />
        </div>
      </form>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          padding: 1rem 0;
        }

        #add-character-initiative-mod {
          max-width: 2rem;
        }

        #add-character-name {
          max-width: 10rem;
        }
      `}</style>
    </>
  );
}
