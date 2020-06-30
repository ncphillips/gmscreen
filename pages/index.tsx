import * as firebase from 'firebase/app';
import { DisplayEncounter } from '@components/encounter';
import { Layout } from '@components/layout';
import { useAuthRequiredRedirect } from '@auth';

export default function Home() {
  useAuthRequiredRedirect();

  return (
    <Layout>
      <DisplayEncounter />;
    </Layout>
  );
}
