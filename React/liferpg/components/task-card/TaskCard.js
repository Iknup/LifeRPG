const TaskCard = props => {
  const {
    isComplete,
    description,
    level,
    expEarned,
    expNeed,
    type,
    totalCleared,
    totalGenerated,
  } = props.task;

  const exp = ((expEarned / expNeed) * 100).toFixed(2) + '%';
  let expCal = `bg-yellow-700 h-full rounded-full`;

  if (level < 10) {
    expCal = 'bg-green-700 h-full rounded-full';
  } else if (level >= 10 && level < 20) {
    expCal = 'bg-blue-700 h-full rounded-full';
  } else if (level >= 20 && level < 30) {
    expCal = 'bg-red-700 h-full rounded-full';
  }

  return (
    <div
      className="bg-tertiary py-1 px-3 mb-2 max-w-screen-md h-20 rounded-xl 
    place-items-center block justify-between"
    >
      <div className="flex w-full h-3/4 justify-between">
        <div className="flex">
          <div className="w-20 place-items-center flex">
            <input
              type="checkbox"
              className="appearance-none h-5 w-5 rounded-full
           bg-white mr-2 border focus:outline-none checked:bg-gray-800"
            />
            <div>lv: {level}</div>
          </div>
          <p className="place-items-center flex">{description}</p>
        </div>
        <div className="">
          clear rate: {`${((totalCleared / totalGenerated) * 100).toFixed(2)}%`}
        </div>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-[15%] group">
        <div className={expCal} style={{ width: exp }}></div>
        <div
          className="w-fit -translate-y-4 text-white font-bold mx-auto 
        text-sm scale-0 transition-all duration-300 group-hover:scale-100"
        >
          {exp}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
