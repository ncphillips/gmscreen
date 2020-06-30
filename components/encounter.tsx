import { Encounter } from '@models/encounter';
import { InitiativeOrder } from './initiative-order';
import { AddCharacterForm } from './add-character';
import { useEncounter } from '@hooks/use-encounter';

export function Encounter() {
  const encounter = useEncounter();
  return (
    <div>
      <h2>Encounter</h2>
      <button onClick={encounter.reset}>Reset</button>
      <AddCharacterForm addCharacter={encounter.addCharacter} />
      <InitiativeOrder encounter={encounter} />
    </div>
  );
}
