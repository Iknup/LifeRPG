import { REPEAT_ENUM } from '@/utility/ENUM';
import { getDay, format } from 'date-fns';
import Repeat from '../Repeat';

const TaskFormIndicator = props => {
  const { errorMessage, repeat, selectedDays } = props;

  let days;
  let date;
  if (repeat === REPEAT_ENUM.EVERY_SELECTED_DAY) {
    days = selectedDays.map(day => getDay(day));
    console.log(days);
  } else if (
    repeat === REPEAT_ENUM.MONTHLY ||
    (repeat === REPEAT_ENUM.NONE && selectedDays.length === 1)
  ) {
    date = format(selectedDays[0], 'dd/MM/yy');
  }

  return (
    <div className="flex justify-between w-full mt-[2px]">
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <div className="flex ml-auto mr-1">
        {date}
        {repeat !== REPEAT_ENUM.NONE && (
          <Repeat repeat={repeat} selectedDays={days} />
        )}
      </div>
    </div>
  );
};

export default TaskFormIndicator;
