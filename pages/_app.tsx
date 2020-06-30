import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthContext, useAuth } from '@auth';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const auth = useAuth();

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

var firebaseConfig = {
  apiKey: 'AIzaSyAodF8CrT7I6VA2SeKpJtxoenj-W0GMBCM',
  authDomain: 'gmscreen-5b464.firebaseapp.com',
  databaseURL: 'https://gmscreen-5b464.firebaseio.com',
  projectId: 'gmscreen-5b464',
  storageBucket: 'gmscreen-5b464.appspot.com',
  messagingSenderId: '626631402001',
  appId: '1:626631402001:web:50b9d2d797f51e618ec7b0',
  measurementId: 'G-0H8E73XLLQ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
