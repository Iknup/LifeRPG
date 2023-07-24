import { useSession, signOut } from 'next-auth/react';

const AccountPage = () => {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div>
      <p>You are not signed in.</p>
    </div>
  );
};

export default account;
