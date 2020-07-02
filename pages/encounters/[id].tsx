import { useRouter } from 'next/router';

export default function DisplayEncounter() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <div>
      {/* <h2>{encounter.data.name}</h2>

      <button onClick={encounter.data.reset}>Reset Encounter</button>
      <AddCharacterForm addCharacter={encounter.data.addCharacter} />
      <button onClick={encounter.data.nextTurn}>Next Turn</button>
      <InitiativeOrder encounter={encounter.data} /> */}
    </div>
  );
}
