import { useRef } from 'react';
import { Character, useCharacterCollection } from '@characters';
import { D20 } from '@dice';

export function AddCharacterForm({ encounter }: { encounter }) {
  const characters = useCharacterCollection();
  const nameRef = useRef<HTMLInputElement>();
  const initModRef = useRef<HTMLInputElement>();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = nameRef.current.value;
          const initMod = ~~initModRef.current.value;
          if (name) {
            characters[name] = {
              id: name,
              name,
              initMod,
              initiative: initMod + D20.roll(),
            };

            const names = encounter.characters || [];

            encounter.characters = [...names, name];
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
