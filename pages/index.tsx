import { Layout } from '@components/layout';
import { useAuthRequiredRedirect } from '@auth';
import { useEncounterCollection } from '@encounters';

export default function Home() {
  useAuthRequiredRedirect();

  return (
    <Layout>
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
        <li key={encounter.id}>{encounter.name}</li>
      ))}
    </ul>
  );
}
