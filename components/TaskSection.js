import { useState } from 'react';
import TaskCard from './task-card/TaskCard';
import NewTaskForm from './task-card/NewTaskForm';
import { SORT_OPTIONS_ENUM } from '@/utility/ENUM';
import { useSelector } from 'react-redux';
import TaskCardAnimation from './animation/TaskCardAnimation';

const TaskSection = ({ sectionName }) => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [updown, setUpdown] = useState(false);
  const [sort, setSort] = useState();
  const [rpgSort, setRpgSort] = useState('All');

  // circle animation until fetching task data
  const loadingAnimation = (
    <div className="  h-screen w-96 flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 h-14 animate-spin"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );

  const sortButtonDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );

  const sortButtonUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
  console.log(tasks);

  let updownButton;

  if (updown === SORT_OPTIONS_ENUM.ascending) {
    updownButton = sortButtonUp;
  } else {
    updownButton = sortButtonDown;
  }

  // sorting by select option
  const taskComponenteGenerate = (selectOption, updown) => {
    let sortedTask;

    if (sectionName === 'overall') {
      sortedTask = [...tasks];
    } else {
      sortedTask = tasks.filter(task => task.section === sectionName);
    }

    switch (selectOption) {
      case SORT_OPTIONS_ENUM.byLvl:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.level - b.level
            : b.level - a.level
        );

        break;
      case SORT_OPTIONS_ENUM.byClearRAte:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.clearRate - b.clearRate
            : b.clearRate - a.clearRate
        );
        break;
      case SORT_OPTIONS_ENUM.byDueDate:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? Date.parse(a.reset) - Date.parse(b.reset)
            : Date.parse(b.reset) - Date.parse(a.reset)
        );
        break;

      default:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? Date.parse(a.createdAt) - Date.parse(b.createdAt)
            : Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
        break;
    }

    return sortedTask;
  };

  // getting sorting option
  const getSortOptionHandler = e => {
    setSort(e.target.value);
  };

  // getting asc and desc arrow option
  const getUpdownHandler = () => {
    setUpdown(!updown);
  };

  const sortedTasks = taskComponenteGenerate(sort, updown);
  //return tasks.map(<TaskCard>)
  return (
    <section className=" min-h-screen w-96 mt-5">
      <h1 className=" pb-1 mx-2 text-2xl font-medium">{`${sectionName.toUpperCase()}`}</h1>
      {/* Sorting table */}
      <div className="flex justify-end mb-4 mx-2">
        <select
          onChange={getSortOptionHandler}
          className="bg-quaternary rounded-lg "
        >
          <option>created</option>
          <option>level</option>
          <option>due date</option>
          <option>clear rate</option>
        </select>
        <button
          onClick={getUpdownHandler}
          className="bg-quaternary rounded-lg px-[1px]"
        >
          {updownButton}
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
      </div>
      <TaskCardAnimation>
        <div className="h-[56px] bg-tertiary mb-3 mx-3 rounded-md flex">
          <input
            className="grow bg-tertiary mx-1 h-1/2 self-center ml-3"
            placeholder="Add a new task here... FC WUT DO?!"
          />
          <div className="ml-auto flex">
            <button className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </button>
            <button className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </button>
            <button className="ml-1 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </TaskCardAnimation>
      {/* Task Card */}
      <div className="flex flex-col">
        {sortedTasks.map(task => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
      <NewTaskForm />
    </section>
  );
};

export default TaskSection;
