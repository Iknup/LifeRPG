import { REPEAT_ENUM } from '@/utility/ENUM';
import { getDay, format } from 'date-fns';
import Repeat from '../Repeat';

const TaskFormIndicator = props => {
  const { errorMessage, repeat, selectedDays } = props;

  let days;
  let date;
  if (repeat === REPEAT_ENUM.EVERY_SELECTED_DAY) {
    const daysInSet = Array.from(new Set(selectedDays.map(day => getDay(day))));
    days = daysInSet.sort((a, b) => {
      return a - b;
    });
  } else if (
    (repeat === REPEAT_ENUM.MONTHLY || repeat === REPEAT_ENUM.NONE) &&
    selectedDays.length === 1
  ) {
    date = format(selectedDays[0], 'dd/MM/yy');
  }

  return (
    <div className="flex justify-between w-full mt-[2px] mx-1">
      <div>
        {errorMessage && (
          <p className="text-DarkRed text-sm font-bold">{errorMessage}</p>
        )}
      </div>
      <div className="flex ml-auto mb-1">
        <p className="text-center self-center">{date}</p>
        {repeat !== REPEAT_ENUM.NONE && (
          <div className="self-center ">
            <Repeat repeat={repeat} selectedDays={days} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFormIndicator;
