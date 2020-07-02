import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useAuth } from '@auth';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const auth = useAuth();

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);

  return <Component {...pageProps} />;
}
