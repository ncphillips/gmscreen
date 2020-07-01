import { useRef } from 'react';

export function AddCharacterForm({
  addCharacter,
}: {
  addCharacter(name: string, initMod: number): void;
}) {
  const name = useRef<HTMLInputElement>();
  const initMod = useRef<HTMLInputElement>();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.current.value) {
            addCharacter(name.current.value, ~~initMod.current.value);
          }
        }}
      >
        <label htmlFor='add-character-name'>
          Name: <input id='add-character-name' ref={name} />
        </label>
        <label htmlFor='add-character-initiative-mod'>
          Init Mod:{' '}
          <input
            id='add-character-initiative-mod'
            ref={initMod}
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
