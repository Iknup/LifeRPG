import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const SignoutUI = () => {
  const { data: session, status } = useSession();

  return (
    <div className="setting-container">
      <div
        className="w-[490px] bg-ColorOne h-[170px] rounded-md mb-10  
      flex flex-col justify-center overflow-hidden"
      >
        <p className="my-auto text-center text-xl ">
          Are you sure you want to log out as <br /> {session?.user?.name}?
        </p>
        <div className="flex justify-evenly bg-ColorTwo h-[30%]">
          <button
            onClick={() => {
              signOut({ callbackUrl: '/signInPage' });
            }}
            className="h-full w-[45%] text-LightRed transition-all duration-150 hover:scale-110"
          >
            Confirm
          </button>
          <div className="border-l-[2px] border-TextColor h-5 my-auto" />
          <Link
            href={'/'}
            className="text-center h-full w-[45%] flex items-center justify-center
            transition-all duration-150 hover:scale-110"
          >
            <p>Cancel</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignoutUI;
