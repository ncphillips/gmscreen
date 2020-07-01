import Link from 'next/link';
import { AuthContext } from '@auth';
import { useContext } from 'react';

export function Layout({ children }) {
  const { auth, isSignedIn, pending } = useContext(AuthContext);

  return (
    <div>
      <nav>
        {isSignedIn ? (
          <a onClick={() => auth().signOut()}>Logout</a>
        ) : (
          <>
            <Link href='/login'>Login</Link>
            <Link href='/signup'>Sign Up</Link>
          </>
        )}
      </nav>
      {pending ? <h2>Loading</h2> : children}
    </div>
  );
}
