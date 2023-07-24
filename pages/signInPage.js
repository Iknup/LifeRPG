import Logo from '@/icons/jsx/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const signInPage = () => {
  const { data: session } = useSession();
  const [isEmailLogin, setIsEmailLogin] = useState(true);
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
      Sign in
    </button>
  );

  const emailLogin = (
    <div
      className={`auth-container ${
        !isEmailLogin
          ? '-translate-x-[100%] opacity-0'
          : '-translate-x-[50%] opacity-1'
      }`}
    >
      <div className="h-[35%] flex flex-col justify-center items-center">
        <Logo />
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
      <h1 className="text-8xl text-center mt-[15%]">Logo</h1>
      <h3 className="text-3xl text-center mt-2">here</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-16 h-16 mx-auto mt-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
      <div className="text-center text-ColorOne font-extrabold text-xl mt-14">
        <button className="bg-colorMain w-[90%] mt-[8%] h-12">
          <p>Google</p>
        </button>
        <button className="bg-colorMain w-[90%] mt-3 h-12">
          <p>Facebook</p>
        </button>
        <button className="bg-colorMain w-[90%] mt-3 h-12">
          <p>Github</p>
        </button>
        <button
          onClick={() => {
            setIsEmailLogin(true);
          }}
          className="mt-3 hover:underline text-ColorSix"
        >
          <p>Log in with email</p>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-[screen - 2.25rem] ">
      {button}
      {emailLogin}
      {authLogin}
    </div>
  );
};

export default signInPage;
