import { REPEAT_ENUM, WEEKDAYS_ENUM } from '@/utility/ENUM';

const Repeat = props => {
  const { repeat, selectedDays } = props;

  const basicClassName =
    'mt-1 border-solid border-[3px] text-sm font-semibold mr-2 rounded-md px-1';

  let repeatContent;

  switch (repeat) {
    case REPEAT_ENUM.DAILY:
      repeatContent = (
        <div className={`${basicClassName} text-colorSub border-colorSub`}>
          Daily
        </div>
      );
      break;
    case REPEAT_ENUM.WEEKLY:
      repeatContent = (
        <div className={`${basicClassName} text-colorMain border-colorMain`}>
          Weekly
        </div>
      );
    case REPEAT_ENUM.EVERY_SELECTED_DAY:
      // finding it's day of each day
      const selectedDaysKeys = Object.keys(WEEKDAYS_ENUM);
      const days = selectedDays?.map(day => selectedDaysKeys[day]);
      console.log(days);
      // Dynamically changing it's color depending on it's existence
      // or
      // only showing days and full name on tooltip on hover
      const daysContent = days.map(day => (
        <div className="flex justify-end mt-1 mr-[2px] group">
          <p
            data-tool
            className={`px-1 text-center text-[7px] font-semibold border-solid border-[2px]
          rounded-full mr-1 ${
            day === 'SUNDAY'
              ? 'border-btnReject text-btnReject'
              : 'border-btnConfirm text-btnConfirm'
          }`}
          >
            {day[0]}
          </p>
          <div className="absolute text-sm scale-0 group-hover:scale-100 translate-x-1/2 translate-y-full">
            {day}
          </div>
        </div>
      ));

      repeatContent = <div className="flex relative">{daysContent}</div>;

    default:
      break;
  }

  return <div>{repeatContent}</div>;
};

export default Repeat;
