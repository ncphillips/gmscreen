import { useEncounter } from '@encounters';
import { useRouter } from 'next/router';

export default function DisplayEncounter() {
  const router = useRouter();
  const encounter = useEncounter(router.query.id as string);

  if (encounter.loading) {
    return <h2>Loading</h2>;
  }

  if (encounter.error) {
    return <h2>{encounter.error.message}</h2>;
  }

  if (!encounter.data) {
    return <h2>Not Found</h2>;
  }

  return (
    <div>
      <h2>{encounter.data.name}</h2>

      {/* <button onClick={encounter.reset}>Reset Encounter</button>
      <AddCharacterForm addCharacter={encounter.addCharacter} />
      <button onClick={encounter.nextTurn}>Next Turn</button>
      <InitiativeOrder encounter={encounter} /> */}
    </div>
  );
}
