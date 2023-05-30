import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';
import { useState } from 'react';
import axios from 'axios';

const TaskCard = props => {
  const { task } = props;
  const {
    isComplete,
    description,
    level,
    experience,
    _id,
    isRPG,
    repeat,
    timeCompleted,
    timeGenerated,
    selectedDays,
  } = task;

  const [checked, setChecked] = useState(isComplete);

  const nextLevelExp = getRequiredExpForLevel(level);
  const prevLevelExp = getPrevLevelExp(level);

  const expBar = (experience - prevLevelExp / nextLevelExp) * 100;

  const onClearHandler = async checked => {
    const updatedData = { isComplete: checked };

    try {
      const response = await axios.patch(`/api/task/${_id}`, updatedData);
      console.log(response);
      setChecked(prev => setChecked(!prev));
    } catch (e) {
      console.log('error!');
      console.error(e);
    }
  };

  const onClickHandler = () => {
    onClearHandler();
  };

  // if (level < 10) {
  //   expCal = 'bg-green-700 h-full rounded-full';
  // } else if (level >= 10 && level < 20) {
  //   expCal = 'bg-blue-700 h-full rounded-full';
  // } else if (level >= 20 && level < 30) {
  //   expCal = 'bg-red-700 h-full rounded-full';
  // }

  return (
    <div className="flex">
      <input
        className="ml-2 mr-1"
        type="checkbox"
        checked={checked}
        onChange={onClickHandler}
      />
      <p className="mr-1">Lvl:{level}</p>
      <p className="mr-1">{description}</p>
      <p className="mr-1">exp: {expBar}</p>
    </div>
  );
};

export default TaskCard;
