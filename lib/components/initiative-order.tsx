import { useEncounter } from '@react-encounters';
import { useCharactersInEncounter } from '@react-encounter-characters';

export function InitiativeOrder({ id }: { id: string }) {
  const encounter = useEncounter(id);
  const characters = useCharactersInEncounter(encounter);
  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Init</td>
          <td>Name</td>
          <td>HP</td>
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => {
          return (
            <tr>
              <td>{character.name === encounter.activeCharacter && '-->'}</td>
              <td>{character.initiative}</td>
              <td>{character.name}</td>
              <td>{character.hpCurrent}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
