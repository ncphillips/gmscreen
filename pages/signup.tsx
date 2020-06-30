import * as firebase from 'firebase';
import { useRef, useState } from 'react';

export default function Signup() {
  const [error, setError] = useState<{ code: string; message: string }>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) return;

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user);
          })
          .catch(setError);
      }}
    >
      <h2>Signup</h2>
      <label htmlFor='email'>
        Email
        <input ref={emailRef} id='email' />
      </label>
      <label htmlFor='password'>
        Password
        <input ref={passwordRef} id='password' type='password' />
      </label>
      <input type='submit' value='Signup' />
      <p>{error && error.message}</p>
    </form>
  );
}
