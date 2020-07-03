import { Encounter, useEncounterCollection, useEncounter } from '@encounters';
import { useCharacterCollection } from '@characters';
import { useEncounterCharacters } from '@encounter-characters';

export function InitiativeOrder({ id }: { id: string }) {
  const encounter = useEncounter(id);
  const characters = useCharacterCollection();
  const encounterCharacters = useEncounterCharacters();
  return (
    <table>
      <thead>
        <tr>
          <td>Init</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {encounterCharacters
          .toArray()
          .filter(({ encounterId }) => encounterId === id)
          .map(({ characterId, initiative }) => ({
            ...characters[characterId],
            initiative,
          }))
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
