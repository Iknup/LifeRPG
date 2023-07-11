const TaskCardUI = props => {
  const { children, className } = props;

  return (
    <div
      className={`h-28 bg-ColorTwo rounded-md  mx-3 relative   
    z-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default TaskCardUI;
