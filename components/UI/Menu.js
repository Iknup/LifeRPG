const Menu = props => {
  const { children, className } = props;
  return (
    <div className={`bg-ColorFour rounded-md ${className}`}>{children}</div>
  );
};

export default Menu;
