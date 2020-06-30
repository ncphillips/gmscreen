import { InitiativeOrder } from './initiative-order';
import { AddCharacterForm } from './add-character';
import { useEncounter } from '@hooks/use-encounter';

export function DisplayEncounter() {
  const encounter = useEncounter();
  return (
    <div>
      <h2>Encounter</h2>
      <button onClick={encounter.reset}>Reset Encounter</button>
      <AddCharacterForm addCharacter={encounter.addCharacter} />
      <InitiativeOrder encounter={encounter} />
    </div>
  );
}
