import { REPEAT_ENUM, WEEKDAYS_ENUM } from '@/utility/ENUM';
import TaskDaily from '@/icons/jsx/Repeat/TaskDaily';
import TaskMonthly from '@/icons/jsx/Repeat/TaskMonthly';
import TaskWeekly from '@/icons/jsx/Repeat/TaskWeekly';
import IconMonday from '@/icons/jsx/Repeat/Weekdays/IconMonday';
import IconTuesday from '@/icons/jsx/Repeat/Weekdays/IconTuesday';
import IconWednesday from '@/icons/jsx/Repeat/Weekdays/IconWednesday';
import IconThursday from '@/icons/jsx/Repeat/Weekdays/IconThursday';
import IconFriday from '@/icons/jsx/Repeat/Weekdays/IconFriday';
import IconSaturday from '@/icons/jsx/Repeat/Weekdays/IconSaturday';
import IconSunday from '@/icons/jsx/Repeat/Weekdays/IconSunday';

const showDayIcon = day => {
  let dayIcon;
  switch (day) {
    case 'MONDAY':
      return (dayIcon = <IconMonday />);
    case 'TUESDAY':
      return (dayIcon = <IconTuesday />);
    case 'WEDNESDAY':
      return (dayIcon = <IconWednesday />);
    case 'THURSDAY':
      return (dayIcon = <IconThursday />);
    case 'FRIDAY':
      return (dayIcon = <IconFriday />);
    case 'SATURDAY':
      return (dayIcon = <IconSaturday />);
    case 'SUNDAY':
      return (dayIcon = <IconSunday />);

    default:
      dayIcon;
      break;
  }

  return dayIcon;
};

const Repeat = props => {
  const { repeat, selectedDays } = props;

  const basicClassName = 'mt-1 mr-1 px-1 align-top';

  switch (repeat) {
    case REPEAT_ENUM.DAILY:
      return (
        <div className={`${basicClassName}`}>
          <TaskDaily className="w-10 h-6" />
        </div>
      );

    case REPEAT_ENUM.WEEKLY:
      return (
        <div className={`${basicClassName}`}>
          <TaskWeekly className="w-10 h-6" />
        </div>
      );
    case REPEAT_ENUM.MONTHLY:
      return (
        <div className={basicClassName}>
          <TaskMonthly className="w-10 h-6" />
        </div>
      );
    case REPEAT_ENUM.EVERY_SELECTED_DAY:
      // finding it's day of each day
      const selectedDaysKeys = Object.keys(WEEKDAYS_ENUM);
      const days = selectedDays?.map(day => selectedDaysKeys[day]);

      // Dynamically changing it's color depending on it's existence
      // or
      // only showing days and full name on tooltip on hover
      const daysContent = days.map(day => {
        const dayIcon = showDayIcon(day);
        return (
          <div key={day} className="flex justify-end mt-1 mr-[2px] group">
            <div className="ml-[1px]">{dayIcon}</div>
            <div className="absolute text-sm scale-0 group-hover:scale-100 translate-x-1/2 translate-y-full">
              {day}
            </div>
          </div>
        );
      });

      return <div className="flex relative mr-1">{daysContent}</div>;
  }
};

export default Repeat;
