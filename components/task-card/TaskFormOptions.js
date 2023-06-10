import { useState } from 'react';
import MyCalendar from '../Calendar';
import CalendarUnchecked from '@/icons/jsx/01-yellow/CalendarUnchecked';
import CalendarChecked from '@/icons/jsx/01-yellow/CalendarChecked';
import { REPEAT_ENUM } from '@/utility/ENUM';

const TaskFormOptions = props => {
  const { className, getOptionHandler, getDaysHandler } = props;
  const [repeatOption, setRepeatOption] = useState('None');
  const [isChecked, setIsChecked] = useState(false);
  const [isTodayChecked, setIsTodayChecked] = useState(false);

  const handleSelectChange = event => {
    setRepeatOption(event.target.value);
  };

  const handleRPGCheckChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    getOptionHandler({ repeat: repeatOption, isRPG: isChecked });
  };

  let repeatStyle;

  if (repeatOption === 'None') {
    repeatStyle = 'bg-testColor';
  } else {
    repeatStyle = 'bg-testColorTwo';
  }

  // text-orange-700

  return (
    <div className={`${className} flex bg-primary w-[430px] p-3 rounded-lg`}>
      <MyCalendar
        getDaysHandler={getDaysHandler}
        todayOn={false}
        className="pr-1"
      />
      <div
        className={`border-l-2 border-l-secondary relative w-1/2 max-w-1/2 pl-1 pt-2`}
      >
        <div className="mb-2">
          <button
            className="flex place-items-center justify-between w-full h-6 hover:bg-ColorTwo
          px-1 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
            <p className="text-lg mr-auto">Today</p>
            {isTodayChecked ? (
              <CalendarChecked className="w-[14px] h-[14px]" />
            ) : (
              <CalendarUnchecked className="w-[14px] h-[14px]" />
            )}
          </button>

          <div className="mt-2  flex px-1 py-1 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
            <p className="text-lg">Repeat?</p>
          </div>

          <select
            onChange={handleSelectChange}
            className={`${repeatStyle} text-md ml-6 pr-1 w-fit appearance-none
              indent-2 rounded-md`}
          >
            <option value={'None'} className="indent-2 bg-primary">
              None
            </option>
            <option value={REPEAT_ENUM.DAILY} className="bg-primary">
              Daily
            </option>
            <option value={REPEAT_ENUM.WEEKLY} className="bg-primary">
              Weekly
            </option>
            <option value={REPEAT_ENUM.EVERY_WEEKDAYS} className="bg-primary">
              Every Weekdays
            </option>
            <option
              value={REPEAT_ENUM.EVERY_SELECTED_DAY}
              className="bg-primary"
            >
              Every selected day
            </option>
            <option value={REPEAT_ENUM.MONTHLY} className="bg-primary">
              Monthly
            </option>
          </select>
        </div>
        {/* <div className="flex mb-2">
          <input
            onChange={handleRPGCheckChange}
            type="checkbox"
            className="mr-2"
          />
          <div className="flex items-center">
            <p>RPG task?</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-1 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div> */}

        <button
          onClick={handleSubmit}
          className="ml-auto bg-testColorTwo py-[2px] px-[4px] rounded-lg mb-2 absolute bottom-0 right-0
        mr-3"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TaskFormOptions;
