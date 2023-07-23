import { useState } from 'react';
import NavBar from './NavBar';
import MenuModal from './Modals/MenuModal';

const Layout = ({ children }) => {
  const [menuShow, setMenuShow] = useState(false);

  const menuShowHandler = () => {
    console.log(menuShow);
    setMenuShow(!menuShow);
  };

  return (
    <div
      className="bg-ColorFour min-h-screen  font-SUITE-Regular 
    text-TextColor"
    >
      {menuShow ? <MenuModal /> : null}

      <NavBar menuShowHandler={menuShowHandler} />
      <div className=" flex-grow mt-2 pl-2 pt-1 rounded-sm text-">
        {children}
      </div>
    </div>
  );
};

export default Layout;
