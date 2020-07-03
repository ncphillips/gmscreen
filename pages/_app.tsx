import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createDb } from '@db';
import { DbContext } from '@db-context';
import { useEffect } from 'react';

const db = createDb();

export default function MyApp({ Component, pageProps }) {
  return (
    <DbContext.Provider value={db}>
      <Component {...pageProps} />
    </DbContext.Provider>
  );
}
