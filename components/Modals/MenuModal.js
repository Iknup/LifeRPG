const MenuModal = () => {
  const buttonStyle = 'flex px-2 ';
  return (
    <div
      className="flex flex-col absolute w-28 mt-1 ml-1
       top-9 gap-y-2
       bg-gradient-to-br  
       from-testColorFour 
       from-80%
       via-testColorTwo
       via-85%       
  
    z-50 rounded-lg text-white drop-shadow-l"
    >
      <button className={`${buttonStyle} pt-1`}>Menu1</button>
      <button className={buttonStyle}>Menu2</button>
      <button className={buttonStyle}>Menu3</button>
      <button className={buttonStyle}>Menu4</button>
      <button className={buttonStyle}>Menu5</button>
      <button className={`${buttonStyle} border-none`}>Menu6</button>
    </div>
  );
};

export default MenuModal;
