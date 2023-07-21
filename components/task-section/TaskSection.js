import { useState, useRef } from 'react';
import TaskCard from '../task-card/TaskCard';
import NewTaskForm from '../task-card/task-form/NewTaskForm';
import { SORT_OPTIONS_ENUM } from '@/utility/ENUM';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import ExpandMenu from '@/icons/jsx/ExpandMenu';
import SectionMenu from './SectionMenu';
import useClickOutside from '@/hooks/useClickOutside';
import { deleteSection } from '@/slices/userSlice';
import { TASK_FILTER_ENUM } from '@/utility/ENUM';

import EditSection from './EditSection';

const TaskSection = ({ sectionData }) => {
  const user = useSelector(state => state.users.user);
  const tasks = useSelector(state => state.tasks.tasks);
  const [isEdit, setIsEdit] = useState(false);
  const [updown, setUpdown] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS_ENUM.byLvl);
  const [rpgSort, setRpgSort] = useState(2);
  const [completedSort, setCompletedSort] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  console.log(rpgSort, completedSort);

  const dispatch = useDispatch();

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

  const filterButton = number => {
    let filterButtonBg;
    if (number === TASK_FILTER_ENUM.FALSE) {
      filterButtonBg = 'bg-ColorOne';
    } else if (number === TASK_FILTER_ENUM.TRUE) {
      filterButtonBg = 'bg-colorMain';
    } else {
      filterButtonBg = 'bg-colorSub';
    }

    return `${filterButtonBg} mr-1 rounded-md px-1`;
  };

  //filtering tasks by it's condition
  const filterTasks = conditions => {
    let sectionTasks;
    if (sectionData.title === user.name) {
      sectionTasks = [...tasks];
    } else {
      sectionTasks = tasks.filter(task => task.section === sectionData._id);
    }

    const { completedSort, rpgSort } = conditions;
    const filterTasks = sectionTasks.filter(task => {
      if (
        completedSort === TASK_FILTER_ENUM.FALSE &&
        rpgSort === TASK_FILTER_ENUM.TRUE
      ) {
        return task.isComplete === false && task.isRPG === true;
      } else if (
        completedSort === TASK_FILTER_ENUM.FALSE &&
        rpgSort === TASK_FILTER_ENUM.FALSE
      ) {
        return task.isComplete === false && task.isRPG === false;
      } else if (
        completedSort === TASK_FILTER_ENUM.TRUE &&
        rpgSort === TASK_FILTER_ENUM.TRUE
      ) {
        return task.isComplete === true && task.isRPG === true;
      } else if (
        completedSort === TASK_FILTER_ENUM.TRUE &&
        rpgSort === TASK_FILTER_ENUM.FALSE
      ) {
        return task.isComplete === true && task.isRPG === false;
      } else if (
        completedSort === TASK_FILTER_ENUM.ALL &&
        rpgSort === TASK_FILTER_ENUM.FALSE
      ) {
        return task.isRPG === false;
      } else if (
        completedSort === TASK_FILTER_ENUM.ALL &&
        rpgSort === TASK_FILTER_ENUM.TRUE
      ) {
        return task.isRPG === true;
      } else if (
        completedSort === TASK_FILTER_ENUM.TRUE &&
        rpgSort === TASK_FILTER_ENUM.ALL
      ) {
        return task.isComplete === true;
      } else if (
        completedSort === TASK_FILTER_ENUM.FALSE &&
        rpgSort === TASK_FILTER_ENUM.ALL
      ) {
        return task.isComplete === false;
      } else {
        return task;
      }
    });

    return filterTasks;
  };

  // sorting by select option
  const taskComponenteGenerate = (selectOption, updown) => {
    const { sort } = selectOption;

    let sortedTasks = filterTasks({ completedSort, rpgSort });

    switch (sort) {
      case SORT_OPTIONS_ENUM.byLvl:
        sortedTasks.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.experience - b.experience
            : b.experience - a.experience
        );

        break;
      case SORT_OPTIONS_ENUM.byClearRAte:
        sortedTasks.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.clearRate - b.clearRate
            : b.clearRate - a.clearRate
        );
        break;
      case SORT_OPTIONS_ENUM.byDueDate:
        sortedTasks.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? Date.parse(a.reset) - Date.parse(b.reset)
            : Date.parse(b.reset) - Date.parse(a.reset)
        );
        break;

      default:
        sortedTasks.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? Date.parse(a.createdAt) - Date.parse(b.createdAt)
            : Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
        break;
    }

    return sortedTasks;
  };

  // getting sorting option

  const getSortOptionHandler = e => {
    setSort(e.target.value);
  };

  // getting asc and desc arrow option
  const getUpdownHandler = () => {
    setUpdown(!updown);
  };

  const sortedTasks = taskComponenteGenerate({ sort, completedSort }, updown);
  //return tasks.map(<TaskCard>)

  // edit section toggle
  const onEditClickHandler = () => {
    setIsEdit(true);
  };

  //canceling section edit
  const editDomNode = useClickOutside(() => {
    setIsEdit(false);
  });

  // delete section
  const onDeleteSectionHandler = () => {
    if (sortedTasks.length > 0 || sectionData.title === 'user_data_name') {
      //error message popup
    } else {
      dispatch(deleteSection(sectionData._id));
    }
  };

  const menuDomNode = useClickOutside(() => {
    setMenuOpen(false);
  });

  return (
    <section className="task-section relative">
      <div ref={editDomNode}>
        {isEdit ? (
          <EditSection
            sectionData={sectionData}
            onClose={() => {
              setIsEdit(false);
            }}
          />
        ) : (
          <h1 className=" pb-1 mb-5 mx-2 text-2xl font-bold">
            {`${sectionData.title.toUpperCase()}`}
          </h1>
        )}
      </div>
      {/* Sorting table */}
      <div className="flex justify-end mb-4 ml-2 mr-6">
        <button
          className={filterButton(rpgSort)}
          onClick={() => {
            setRpgSort(prevState => (prevState + 1) % 3);
          }}
        >
          <p>RPGTask</p>
        </button>
        <button
          className={filterButton(completedSort)}
          onClick={() => {
            setCompletedSort(prevState => (prevState + 1) % 3);
          }}
        >
          <p>Complete</p>
        </button>
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
        <div ref={menuDomNode} className="relative ml-1">
          <button
            onClick={() => {
              setMenuOpen(prevState => !prevState);
            }}
          >
            <ExpandMenu scale={14} />
          </button>
          {menuOpen && (
            <div className="absolute z-50 -left-[10px] top-4">
              <SectionMenu
                onEdit={onEditClickHandler}
                onDelete={onDeleteSectionHandler}
                onClose={() => {
                  setMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mr-[10px] ">
        <NewTaskForm sectionId={sectionData._id} />
      </div>
      {/* Task Card */}

      <div
        className="flex flex-col h-[75%] sectionTaskBox
        overflow-y-hidden hover:overflow-y-auto scroll-smooth"
      >
        <AnimatePresence>
          {sortedTasks.map(task => (
            <TaskCard task={task} key={task._id} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TaskSection;
