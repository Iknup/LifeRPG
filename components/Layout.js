import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div
      className="bg-ColorFour min-h-screen  font-SUITE-Regular 
    text-TextColor"
    >
      <NavBar />
      <div className=" flex-grow mt-2 pl-2 pt-1 rounded-sm ">{children}</div>
    </div>
  );
};

export default Layout;
