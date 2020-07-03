import { createDb } from '@db';
import { DbContext } from '@db-context';

const db = createDb();

export default function MyApp({ Component, pageProps }) {
  return (
    <DbContext.Provider value={db}>
      <Component {...pageProps} />
    </DbContext.Provider>
  );
}
