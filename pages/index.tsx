import { Layout } from '@components/layout';
import { useEncounterCollection } from '@encounters';
import { useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <CreateEncounterForm />
      <EncounterList />
    </Layout>
  );
}

function EncounterList() {
  const encounters = useEncounterCollection();

  if (encounters.loading) {
    return <h3>Loading Encounters</h3>;
  }

  return (
    <ul>
      {encounters.data.map((encounter) => (
        <li key={encounter.id}>
          <Link href={`/encounters/${encounter.id}`}>
            <a>{encounter.name}</a>
          </Link>
          <button onClick={() => encounter.delete()}>Destroy</button>
        </li>
      ))}
    </ul>
  );
}

function CreateEncounterForm() {
  const nameRef = useRef<HTMLInputElement>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const name = nameRef.current.value;

        if (!name) return;

        // new Encounter({ name }).save();
      }}
    >
      <label>
        Name:
        <input ref={nameRef} />
      </label>
      <input type='submit' value='Create Encounter' />
    </form>
  );
}
