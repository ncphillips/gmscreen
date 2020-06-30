import { Character } from '@models/encounter';
import { useRef } from 'react';

export function AddCharacterForm({
  addCharacter,
}: {
  addCharacter(character: Character): void;
}) {
  const name = useRef<HTMLInputElement>();
  const initMod = useRef<HTMLInputElement>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addCharacter(
          new Character(name.current.value, ~~initMod.current.value)
        );
      }}
    >
      <label htmlFor='add-character-name'>
        Name
        <input id='add-character-name' ref={name} />
      </label>
      <label htmlFor='add-character-initiative-mod'>
        Init Mod
        <input
          id='add-character-initiative-mod'
          ref={initMod}
          type='number'
          defaultValue={0}
          step={1}
        />
        <input type='submit' value='Submit' />
      </label>
    </form>
  );
}
