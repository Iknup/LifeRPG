import LogoVertical from '@/icons/jsx/LogoVertical';
import TooltipIcon from '@/icons/jsx/TooltipIcon';
import LogOutIcon from '@/icons/jsx/authIcons/LogOutIcon';
import ProfileIcon from '@/icons/jsx/authIcons/ProfileIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NavBar = props => {
  const router = useRouter();
  const { pathname } = router;

  const menuButtonHanlder = () => {
    console.log('showButton');
    props.menuShowHandler();
  };

  return (
    <div className="bg-ColorOne h-10 min-h-full flex justify-between ">
      <div className="flex text-white text-lg min-h-full items-center">
        <Link className="ml-2 flex items-center" href={'/'}>
          <LogoVertical scale={{ w: '91', h: '25' }} />
        </Link>
      </div>
      <div className="flex text-white text-lg min-h-full items-center">
        <Link href={'/settings'} className="mr-2">
          <ProfileIcon scale={18} />
        </Link>
        <Link href={'/about'} className="mr-2">
          <TooltipIcon scale={18} />
        </Link>
        <Link href={'/signOut'} className="mr-1">
          <LogOutIcon scale={18} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
