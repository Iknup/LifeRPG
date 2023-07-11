import { useState } from 'react';
import TaskCard from './task-card/TaskCard';
import NewTaskForm from './task-card/task-form/NewTaskForm';
import { SORT_OPTIONS_ENUM } from '@/utility/ENUM';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

const TaskSection = ({ sectionName }) => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [updown, setUpdown] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS_ENUM.byLvl);
  const [rpgSort, setRpgSort] = useState('All');
  const [completedSort, setCompletedSort] = useState('Unclear');

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

  let updownButton;

  if (updown === SORT_OPTIONS_ENUM.ascending) {
    updownButton = sortButtonUp;
  } else {
    updownButton = sortButtonDown;
  }

  // sorting by select option
  const taskComponenteGenerate = (selectOption, updown) => {
    const { sort, completedSort } = selectOption;
    let sortedTask;

    if (sectionName === 'user_data_name') {
      sortedTask = [...tasks];
    } else {
      sortedTask = tasks.filter(task => task.section === sectionName);
    }

    if (completedSort === 'Unclear') {
      sortedTask = sortedTask.filter(task => task.isComplete === false);
    } else {
      sortedTask = [...tasks];
    }

    switch (sort) {
      case SORT_OPTIONS_ENUM.byLvl:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.experience - b.experience
            : b.experience - a.experience
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
  const getCompeleteSortHandler = e => {
    setCompletedSort(e.target.value);
  };

  const getSortOptionHandler = e => {
    setSort(e.target.value);
  };

  // getting asc and desc arrow option
  const getUpdownHandler = () => {
    setUpdown(!updown);
  };

  const sortedTasks = taskComponenteGenerate({ sort, completedSort }, updown);
  //return tasks.map(<TaskCard>)
  return (
    <section className=" h-screen w-[400px] mr-[10px] mt-5 ">
      <h1 className=" pb-1 mx-2 text-2xl font-medium">{`${sectionName.toUpperCase()}`}</h1>
      {/* Sorting table */}
      <div className="flex justify-end mb-4 ml-2 mr-5">
        <select
          onChange={getCompeleteSortHandler}
          className="bg-gradient-to-b from-secondary via-tertiary to-quaternary border-solid 
          border-[1px] text-center border-quaternary rounded-xl appearance-none mr-1 px-2 "
        >
          <option value={'Unclear'}>Unclear</option>
          <option value={'All'}>All</option>
        </select>
        <select
          onChange={getSortOptionHandler}
          value={sort}
          className="bg-gradient-to-b 
          from-secondary 
          via-tertiary 
          to-quaternary border-solid 
          border-[1px] text-center 
          border-quaternary rounded-xl 
          appearance-none mr-1 "
        >
          <option value={SORT_OPTIONS_ENUM.byCreatedAt}>created</option>
          <option value={SORT_OPTIONS_ENUM.byLvl}>level</option>
          <option value={SORT_OPTIONS_ENUM.byDueDate}>due date</option>
          <option value={SORT_OPTIONS_ENUM.byClearRAte}>clear rate</option>
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
      <div className="mr-[10px]">
        <NewTaskForm />
      </div>
      {/* Task Card */}
      <AnimatePresence>
        <div
          className="flex flex-col h-[75%] sectionTaskBox
        overflow-y-hidden hover:overflow-y-auto scroll-smooth"
        >
          {sortedTasks.map(task => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default TaskSection;
