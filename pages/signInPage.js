import LogoHorizontal from '@/icons/jsx/LogoHorizontal';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const SignInPage = () => {
  const { data: session } = useSession();
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const emailLogin = (
    <div
      className={`auth-container ${
        !isEmailLogin
          ? '-translate-x-[100%] opacity-0'
          : '-translate-x-[50%] opacity-1'
      }`}
    >
      <div className="h-[40%] flex flex-col justify-center items-center pt-10">
        <LogoHorizontal />
      </div>
      <div className="flex flex-col gap-4 mx-4 mt-[15%]">
        <input className="auth-input" type="email" placeholder="email" />
        <input className="auth-input" type="text" placeholder="password" />
      </div>
      <div className="text-center text-ColorOne font-extrabold text-xl">
        <button
          className="bg-colorMain w-[90%] mt-[8%] h-12"
          onClick={() => {
            signIn(undefined, { callbackUrl: '/' });
          }}
        >
          <p>Sign in</p>
        </button>
        <button
          onClick={() => {
            setIsEmailLogin(false);
          }}
          className="bg-colorMain w-[90%] mt-3 h-12"
        >
          <p>Log in with other Auth</p>
        </button>
      </div>
      <div className="flex flex-col mt-4">
        <Link href={'/register'} className="mb-2 hover:underline text-ColorSix">
          <p className="text-center">Register</p>
        </Link>
        <Link href={'/findpassword'} className="hover:underline text-ColorSix">
          <p className="text-center">forgot Password?</p>
        </Link>
      </div>
    </div>
  );

  const authLogin = (
    <div
      className={`auth-container  ${
        !isEmailLogin
          ? '-translate-x-[50%] opacity-1'
          : 'opacity-0 translate-x-[50%]'
      }`}
    >
      <div className="h-[40%] flex flex-col justify-center items-center pt-10">
        <LogoHorizontal />
      </div>
      <div className="text-center text-ColorOne font-extrabold text-xl mt-14">
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' });
          }}
          className="bg-colorMain w-[90%] mt-[8%] h-12"
        >
          <p>Google</p>
        </button>
        <button
          onClick={() => {
            signIn('facebook', { callbackUrl: '/' });
          }}
          className="bg-colorMain w-[90%] mt-3 h-12"
        >
          <p>Facebook</p>
        </button>
        <button
          onClick={() => {
            signIn('github', { callbackUrl: '/' });
          }}
          className="bg-colorMain w-[90%] mt-3 h-12"
        >
          <p>Github</p>
        </button>
        {/* <button
          onClick={() => {
            setIsEmailLogin(true);
          }}
          className="mt-3 hover:underline text-ColorSix"
        >
          <p>Log in with email</p>
        </button> */}
      </div>
    </div>
  );

  return (
    <div className="h-[screen - 2.25rem] ">
      {emailLogin}
      {authLogin}
    </div>
  );
};

export default SignInPage;
