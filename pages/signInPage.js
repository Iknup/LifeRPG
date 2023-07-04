import { useSession, signIn, signOut } from 'next-auth/react';

const signInPage = () => {
  const { data: session } = useSession();
  const button = session ? (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Let me go!
    </button>
  ) : (
    <button
      onClick={() => {
        signIn(undefined, { callbackUrl: '/' });
      }}
    >
      Sign the fck in!
    </button>
  );

  return <div>{button}</div>;
};

export default signInPage;
