import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  parse,
  startOfMonth,
  startOfToday,
  isToday,
  isSameMonth,
  endOfWeek,
  add,
  startOfWeek,
} from 'date-fns';
import { useState, useEffect } from 'react';

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MyCalendar = props => {
  const { todayOn } = props;
  const today = startOfToday();
  const todayOnCheck = todayOn ? today : null;
  const [selectedDays, setSelectedDays] = useState([todayOnCheck]);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const { className, getDaysHandler } = props;

  useEffect(() => {
    getDaysHandler(selectedDays);
  }, [selectedDays]);

  const newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const prevMonth = () => {
    const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'));
  };

  const isSelected = day =>
    selectedDays.some(selectedDay => isEqual(selectedDay, day));

  const handleDayClick = day => {
    if (isSelected(day)) {
      // If the clicked day is already selected, remove it from the selectedDays array
      setSelectedDays(
        selectedDays.filter(selectedDay => !isEqual(selectedDay, day))
      );
    } else {
      // If the clicked day is not selected, add it to the selectedDays array
      setSelectedDays(prevState => [...prevState, day]);
    }
  };

  return (
    <div className={`pt-2 ${className}`}>
      <div className="max-w-sm md:max-w-4xl">
        <div>
          <div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="-my-1.5 flex flex-none items-center justify-center 
                p-1.5 text-white hover:text-gray-400"
              >
                <span className="sr-only">Previous month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h2 className="font-semibold text-textPrimary">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={nextMonth}
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center 
                justify-center p-1.5 text-white hover:text-gray-400"
              >
                <span className="sr-only">Next month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 mt-1 text-sm leading-6 text-center">
              <div className="text-red-700 font-semibold">S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {newDays.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    // 요일에 따라 매월 1일을 해당 요일 위치로 보냄
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(day)}
                    className={classNames(
                      isSelected(day) && 'text-white', // Apply the selected style
                      !isSelected(day) && isToday(day) && 'text-orange-700', // Apply today style
                      !isSelected(day) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-white', // Apply styles for days in the current month
                      !isSelected(day) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400', // Apply styles for dyas in the other month
                      isSelected(day) && isToday(day) && 'bg-orange-700', // Selected and today style
                      isSelected(day) && !isToday(day) && 'bg-black', // Selected but not today style
                      !isSelected(day) && 'hover:bg-primary', // hover style
                      (isSelected(day) || isToday(day)) && 'font-semibold', // Font style for today and selected days
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
