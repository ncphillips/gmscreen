import { useRouter } from 'next/router';
import { useEncounter } from '@encounters';
import { InitiativeOrder } from '@components/initiative-order';
import { AddCharacterForm } from '@components/add-character';

export default function DisplayEncounter() {
  const router = useRouter();
  const id = router.query.id;

  const encounter = useEncounter(id as string);

  if (!encounter) return <h2>404</h2>;

  return (
    <div>
      <h2>{encounter.name}</h2>

      {/* <button onClick={encounter.reset}>Reset Encounter</button> */}
      <AddCharacterForm encounter={encounter} />
      {/* <button onClick={encounter.data.nextTurn}>Next Turn</button> */}
      <InitiativeOrder encounter={encounter} />
    </div>
  );
}
