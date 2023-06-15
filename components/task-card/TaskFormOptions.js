import { useState, useReducer } from 'react';
import MyCalendar from '../Calendar';
import CalendarUnchecked from '@/icons/jsx/01-yellow/CalendarUnchecked';
import CalendarChecked from '@/icons/jsx/01-yellow/CalendarChecked';
import { REPEAT_ENUM } from '@/utility/ENUM';

const OPTIONS = Object.freeze({
  TODAY_CHECK: 'today check',
  NEXTWEEK_CHECK: 'nextweek check',
  REPEAT_OPTION: 'repeat option',
  SELECTED_DAYS: 'selected days',
});

const reducer = (state, action) => {
  const newState = { ...state };
  const showSuggestWeeklyOnHandler = () => {
    if (newState.isTodayChecked && newState.isNextWeekChecked) {
      newState.showSuggest = true;
      newState.repeatOption = REPEAT_ENUM.WEEKLY;
    } else {
      newState.showSuggest = false;
    }
  };
  switch (action.type) {
    case OPTIONS.TODAY_CHECK:
      newState.isTodayChecked = !state.isTodayChecked;
      showSuggestWeeklyOnHandler();
      return newState;
    case OPTIONS.NEXTWEEK_CHECK:
      newState.isNextWeekChecked = !state.isNextWeekChecked;
      showSuggestWeeklyOnHandler();
      return newState;
    case OPTIONS.REPEAT_OPTION:
      if (action.payload !== REPEAT_ENUM.WEEKLY && newState.showSuggest) {
        newState.showSuggest = false;
        newState.isNextWeekChecked = false;
      }

      newState.repeatOption = action.payload;
      return newState;
    case OPTIONS.SELECTED_DAYS:
      newState.selectedDays = action.payload;

    default:
      return state;
  }
};

const TaskFormOptions = props => {
  const { className, getOptionHandler, getDaysHandler } = props;
  const [state, dispatch] = useReducer(reducer, {
    repeatOption: 'None',
    isTodayChecked: false,
    isNextWeekChecked: false,
    showSuggest: false,
    selectedDays: [],
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = event => {
    dispatch({ type: OPTIONS.REPEAT_OPTION, payload: event.target.value });
  };

  const handleSubmit = () => {
    getOptionHandler({ repeat: state.repeatOption });
  };

  let repeatStyle;

  if (state.repeatOption === 'None') {
    repeatStyle = 'bg-testColor';
  } else {
    repeatStyle = 'bg-testColorTwo';
  }

  const todayButtonHandler = () => {
    dispatch({ type: OPTIONS.TODAY_CHECK });
  };

  const nextWeekButtonHandler = () => {
    dispatch({ type: OPTIONS.NEXTWEEK_CHECK });
  };

  const getSelectedDaysHandler = days => {
    dispatch({ type: OPTIONS.SELECTED_DAYS, payload: days });
  };

  return (
    <div className={`${className} flex bg-primary w-[430px] p-3 rounded-lg`}>
      <MyCalendar
        getSelectedDaysHandler={getSelectedDaysHandler}
        todayOn={state.isTodayChecked}
        nextWeekOn={state.isNextWeekChecked}
        className="pr-1"
      />
      {/* Days and repeat options */}
      <div
        className={`border-l-2 border-l-secondary relative w-1/2 max-w-1/2 pl-1 pt-2`}
      >
        <div className="mb-2">
          {/* Today */}
          <button
            onClick={todayButtonHandler}
            className="flex h-fit place-items-center justify-between w-full hover:bg-ColorTwo
          px-1 py-1"
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
            {state.isTodayChecked ? (
              <CalendarChecked className="w-[14px] h-[14px]" />
            ) : (
              <CalendarUnchecked className="w-[14px] h-[14px]" />
            )}
          </button>
          {/* Next Week */}
          <button
            onClick={nextWeekButtonHandler}
            className="flex h-fit place-items-center justify-between w-full hover:bg-ColorTwo
          px-1 py-1"
          >
            <p className="text-lg mr-auto">Next Week</p>
            {state.isNextWeekChecked ? (
              <CalendarChecked className="w-[14px] h-[14px]" />
            ) : (
              <CalendarUnchecked className="w-[14px] h-[14px]" />
            )}
          </button>
          {/* Next Month */}
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
            value={state.repeatOption}
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
          {state.showSuggest && (
            <p className="mt-2 mx-2 text-colorMain text-xs text-end">
              Do you wish to repeat weekly?
            </p>
          )}
        </div>
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
