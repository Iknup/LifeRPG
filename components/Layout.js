import { Fragment } from 'react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="bg-quaternary min-h-screen">
      <NavBar />
      <div className=" flex-grow mt-2 pl-2 pt-1 rounded-sm ">{children}</div>
    </div>
  );
};

export default Layout;
