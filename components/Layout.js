import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="bg-primary flex min-h-screen ">
      <NavBar />
      <div className="bg-secondary flex-grow mt-2 pl-2 pt-1 rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default Layout;
