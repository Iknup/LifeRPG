import { useState, useReducer } from 'react';
import MyCalendar from '../Calendar';
import CalendarUnchecked from '@/icons/jsx/01-yellow/CalendarUnchecked';
import CalendarChecked from '@/icons/jsx/01-yellow/CalendarChecked';
import { REPEAT_ENUM } from '@/utility/ENUM';
import Nextweek from '@/icons/jsx/Nextweek';

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
      newState.repeatOption = REPEAT_ENUM.EVERY_SELECTED_DAY;
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
      return newState;
    default:
      return state;
  }
};

const TaskFormOptions = props => {
  const { className, getOptionAndDaysHandler, closeOptionHandler } = props;
  const { repeat, selectedDays } = props.options;
  const [state, dispatch] = useReducer(reducer, {
    repeatOption: repeat || 'None',
    isTodayChecked: false,
    isNextWeekChecked: false,
    showSuggest: false,
    selectedDays: selectedDays || [],
  });

  const handleSelectChange = event => {
    dispatch({ type: OPTIONS.REPEAT_OPTION, payload: event.target.value });
  };

  const handleSubmit = () => {
    getOptionAndDaysHandler({
      repeat: state.repeatOption,
      selectedDays: state.selectedDays,
    });
  };

  let repeatStyle;

  if (state.repeatOption === REPEAT_ENUM.NONE) {
    repeatStyle = 'bg-DarkRed';
  } else {
    repeatStyle = 'bg-DarkGreen';
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

  const closeOption = () => {
    closeOptionHandler();
  };

  const resetHandler = () => {
    getOptionAndDaysHandler({});
  };

  return (
    <div className={`${className} flex bg-ColorOne w-[430px] p-3 rounded-lg`}>
      <MyCalendar
        getSelectedDaysHandler={getSelectedDaysHandler}
        todayOn={state.isTodayChecked}
        nextWeekOn={state.isNextWeekChecked}
        preSelectedDays={selectedDays}
        className="pr-1"
      />
      {/* Days and repeat options */}
      <div
        className={`border-l-2 border-l-secondary relative w-1/2 max-w-1/2 pl-1 pt-2`}
      >
        <button onClick={closeOption} className="absolute -top-2 -right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

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
            <Nextweek />
            <p className="text-lg  ml-1 mr-auto">Next Week</p>
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
            <option value={'None'} className=" bg-ColorOne">
              None
            </option>
            <option value={REPEAT_ENUM.DAILY} className=" bg-ColorOne">
              Daily
            </option>
            <option value={REPEAT_ENUM.EVERY_WEEKDAYS} className=" bg-ColorOne">
              Every Weekdays
            </option>
            <option
              value={REPEAT_ENUM.EVERY_SELECTED_DAY}
              className=" bg-ColorOne"
            >
              Every selected day
            </option>
            <option value={REPEAT_ENUM.MONTHLY} className=" bg-ColorOne">
              Monthly
            </option>
          </select>
          {state.showSuggest && (
            <p className="mt-2 mx-2 text-colorMain text-xs text-end">
              Do you wish to repeat weekly?
            </p>
          )}
        </div>
        <div className="absolute bottom-0 right-0">
          <button
            onClick={resetHandler}
            className="py-[2px] px-[5px] rounded-lg mb-2 bg-DarkRed mr-2"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="ml-auto bg-DarkGreen py-[2px] px-[4px] rounded-lg mb-2 
        mr-3"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFormOptions;
