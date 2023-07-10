const TaskDropDownCard = props => {
  const { children, className } = props;
  return (
    <div
      className={`w-100%  bg-ColorThree mx-3 rounded-b-md ${className}`}
    >
      {children}
    </div>
  );
};

export default TaskDropDownCard;
