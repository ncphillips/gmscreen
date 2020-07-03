import { Layout } from '@components/layout';
import { useEncounterCollection } from '@encounters';
import { useRef, useContext } from 'react';
import Link from 'next/link';
import { DbContext } from '@db-context';
import { watch } from 'babas';

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

  return (
    <ul>
      {encounters.toArray().map((encounter) => (
        <li key={encounter.id}>
          <Link href={`/encounters/${encounter.id}`}>
            <a>{encounter.name}</a>
          </Link>
          <button
            onClick={() => {
              delete encounters[encounter.id];
            }}
          >
            Destroy
          </button>
        </li>
      ))}
    </ul>
  );
}

function CreateEncounterForm() {
  const db = useContext(DbContext);
  const nameRef = useRef<HTMLInputElement>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const name = nameRef.current.value;

        if (!name) return;

        db.encounters.add(name, {
          id: name,
          name,
        });
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
