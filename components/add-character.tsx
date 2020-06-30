import { Character } from '@models/encounter';
import { useRef } from 'react';

export function AddCharacterForm({
  addCharacter,
}: {
  addCharacter(character: Character): void;
}) {
  const name = useRef<HTMLInputElement>();
  const initiative = useRef<HTMLInputElement>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addCharacter({
          name: name.current.value,
          initiative: ~~initiative.current.value,
        });
      }}
    >
      <label htmlFor='add-character-name'>
        Name
        <input id='add-character-name' ref={name} />
      </label>
      <label htmlFor='add-character-initiative'>
        Initiative
        <input
          id='add-character-initiative'
          ref={initiative}
          type='number'
          defaultValue={10}
        />
        <input type='submit' value='Submit' />
      </label>
    </form>
  );
}
