import { Encounter } from '@encounters';
import { useCharacterCollection } from '@characters';

export function InitiativeOrder({ encounter }: { encounter: Encounter }) {
  const characters = useCharacterCollection();
  return (
    <table>
      <thead>
        <tr>
          <td>Init</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {characters.data
          .sort((a, b) => b.initiative - a.initiative)
          .map((character) => {
            return (
              <tr>
                <td>{character.initiative}</td>
                <td>{character.name}</td>
                {/* <td>{character.name === encounter.activeCharacter && '<--'}</td> */}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
