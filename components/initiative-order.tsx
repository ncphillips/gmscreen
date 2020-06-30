import { Encounter } from '@models/encounter';

export function InitiativeOrder({ encounter }: { encounter: Encounter }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Init</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {encounter.characters
          .sort((a, b) => b.initiative - a.initiative)
          .map((character) => {
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
