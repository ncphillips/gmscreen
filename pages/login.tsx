import * as firebase from 'firebase/app';
import Link from 'next/link';
import { useRef, useState, useEffect, useContext } from 'react';
import { Router, useRouter } from 'next/router';
import { AuthContext } from '@auth';

export default function Signup() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth.isSignedIn) {
      router.push('/');
    }
  }, [auth.isSignedIn]);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<{ code: string; message: string }>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) return;

        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            router.push('/');
          })
          .catch(setError);
      }}
    >
      <h2>Login</h2>
      <label htmlFor='email'>
        Email
        <input ref={emailRef} id='email' />
      </label>
      <label htmlFor='password'>
        Password
        <input ref={passwordRef} id='password' type='password' />
      </label>
      <input type='submit' value='Login' />
      <p>{error && error.message}</p>

      <br />
      <p>
        <Link href='/signup'>Sign Up</Link>
      </p>
    </form>
  );
}
