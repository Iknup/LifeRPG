import LogoHorizontal from '@/icons/jsx/LogoHorizontal';
import Link from 'next/link';

const FindPasswordPage = () => {
  return (
    <div className="auth-container -translate-x-[50%]">
      <div className="h-[40%] flex flex-col justify-center items-center pt-10">
        <LogoHorizontal />
      </div>
      <div className="flex flex-col gap-4 mx-4 text-center mt-10">
        <h1 className="text-2xl">Find Password</h1>
        <p>A mail will be send to an email you Submit</p>
        <input className="auth-input" type="email" placeholder="email" />
      </div>
      <div className="text-center text-ColorOne font-extrabold text-xl">
        <button className="bg-colorMain w-[90%] mt-3 h-12 mb-5">
          <p>Submit</p>
        </button>
        <Link href={'/signInPage'}>
          <p className="text-ColorSix text-center hover:underline">Log In</p>
        </Link>
      </div>
    </div>
  );
};

export default FindPasswordPage;
