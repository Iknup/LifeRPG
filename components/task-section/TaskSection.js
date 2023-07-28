import { useState } from 'react';
import TaskCard from '../task-card/TaskCard';
import NewTaskForm from '../task-card/task-form/NewTaskForm';
import { SORT_OPTIONS_ENUM } from '@/utility/ENUM';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import ExpandMenu from '@/icons/jsx/ExpandMenu';
import SectionMenu from './SectionMenu';
import TaskFormOptions from '../task-card/task-form/TaskFormOptions';
import useClickOutside from '@/hooks/useClickOutside';
import { deleteSection } from '@/slices/userSlice';
import { TASK_FILTER_ENUM } from '@/utility/ENUM';
import EditSection from './EditSection';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/src/graphql/dnd/item-types';
import { editTask } from '@/slices/taskSlice';
import SortingButton from '@/icons/jsx/section/SortingButton';

const TaskSection = ({ sectionData }) => {
  const user = useSelector(state => state.users.user);
  const tasks = useSelector(state => state.tasks.tasks);
  const [isEdit, setIsEdit] = useState(false);
  const [updown, setUpdown] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS_ENUM.byLvl);
  const [rpgSort, setRpgSort] = useState(false);
  const [completedSort, setCompletedSort] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: item => {
      dropOnSection(item.id, item.section);
    },
    // canDrop: item => {
    //   if (sectionData.title === user.name) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    hover: (item, monitor) => {
      if (monitor.canDrop()) {
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const dispatch = useDispatch();

  const dropOnSection = (id, sectionId) => {
    if (sectionId === sectionData._id) {
      return;
    }

    console.log(sectionData._id);

    dispatch(
      editTask({
        taskData: { taskId: id, section: sectionData._id },
        isEdit: true,
      })
    );
  };

  const onCalendarButtonClick = () => {
    setShowCalendar(prevState => !prevState);
  };

  const calendarDomNode = useClickOutside(() => {
    setShowCalendar(false);
  });

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
      if (rpgSort) {
        if (completedSort === TASK_FILTER_ENUM.FALSE) {
          return task.isComplete === false && task.isRPG === true;
        } else if (completedSort === TASK_FILTER_ENUM.TRUE) {
          return task.isComplete === true && task.isRPG === true;
        } else {
          return task.isRPG === true;
        }
      } else {
        if (completedSort === TASK_FILTER_ENUM.FALSE) {
          return task.isComplete === false;
        } else if (completedSort === TASK_FILTER_ENUM.TRUE) {
          return task.isComplete === true;
        } else {
          return task;
        }
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
          <h1 className=" indent-2 pb-1 mb-5 mx-2 text-2xl font-bold">
            {`${sectionData.title.toUpperCase()}`}
          </h1>
        )}
      </div>
      {/* Sorting table */}
      <div className="flex justify-end mb-4 ml-2 mr-6">
        <select
          onChange={getSortOptionHandler}
          value={sort}
          className="bg-ColorTwo rounded-md appearance-none text-center"
        >
          <option value={SORT_OPTIONS_ENUM.byCreatedAt}>created</option>
          <option value={SORT_OPTIONS_ENUM.byLvl}>level</option>
          <option value={SORT_OPTIONS_ENUM.byDueDate}>due date</option>
          <option value={SORT_OPTIONS_ENUM.byClearRAte}>clear rate</option>
        </select>
        <div
          ref={menuDomNode}
          className="relative ml-1 bg-ColorTwo pt-[2px] px-2 rounded-md"
        >
          <button
            onClick={getUpdownHandler}
            className="bg-quaternary rounded-lg px-[1px] mr-[6px]"
          >
            <SortingButton scale={14} />
          </button>
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
                completeSort={setCompletedSort}
                rpgSort={setRpgSort}
                initState={{ rpgSort, completedSort }}
                onClose={() => {
                  setMenuOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div ref={calendarDomNode} className="mr-[10px] ">
        <NewTaskForm
          sectionId={sectionData._id}
          showCalendar={onCalendarButtonClick}
        />
        {showCalendar && (
          <div className="relative z-50">
            <TaskFormOptions
              // getOptionAndDaysHandler={}
              className="absolute -top-[68px] left-[100%] z-50"
              closeOptionHandler={() => {
                setShowCalendar();
              }}
              sectionId={sectionData._id}
              // options={}
            />
          </div>
        )}
      </div>
      {/* Task Card */}
      <div
        ref={drop}
        className={`flex flex-col h-[80%] sectionTaskBox
        overflow-y-hidden hover:overflow-y-auto scroll-smooth ${
          canDrop ? 'animate-shadowBling' : ''
        }`}
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
