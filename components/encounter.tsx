import { InitiativeOrder } from './initiative-order';
import { AddCharacterForm } from './add-character';
import { useEncounter } from '@hooks/use-encounter';

export function DisplayEncounter() {
  const encounter = useEncounter();
  console.log(encounter);
  return (
    <div>
      <h2>Encounter</h2>
      <button onClick={encounter.reset}>Reset Encounter</button>
      <AddCharacterForm addCharacter={encounter.addCharacter} />
      <button onClick={encounter.nextTurn}>Next Turn</button>
      <InitiativeOrder encounter={encounter} />
    </div>
  );
}
