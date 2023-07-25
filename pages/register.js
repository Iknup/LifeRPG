import LogoHorizontal from '@/icons/jsx/LogoHorizontal';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="auth-container -translate-x-[50%] ">
      <div className="h-[40%] flex flex-col justify-center items-center pt-10">
        <LogoHorizontal />
      </div>
      <div className="flex flex-col gap-4 mx-4 text-center mt-10">
        <input
          type="email"
          placeholder="email"
          className="auth-input placeholder:text-LightRed"
        />
        <input type="text" placeholder="password" className="auth-input" />
        <input
          type="text"
          placeholder="confirm password"
          className="auth-input"
        />
        <input type="text" placeholder="name" className="auth-input" />
      </div>
      <div className="text-center text-ColorOne font-extrabold text-xl mt-6">
        <button className="bg-colorMain w-[90%] mt-3 h-12 mb-5">
          <p>Register</p>
        </button>
        <Link href={'/signInPage'}>
          <p className="text-ColorSix hover:underline">Log In</p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
