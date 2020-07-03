import { useEncounter } from '@encounters';
import { useCharactersInEncounter } from '@encounter-characters';

export function InitiativeOrder({ id }: { id: string }) {
  const encounter = useEncounter(id);
  const characters = useCharactersInEncounter(encounter);
  return (
    <table>
      <thead>
        <tr>
          <td>Init</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => {
          return (
            <tr>
              <td>{character.initiative}</td>
              <td>{character.name}</td>
              <td>{character.name === encounter.activeCharacter && '<--'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
