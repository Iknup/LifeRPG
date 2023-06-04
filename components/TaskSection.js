import { useState, useEffect } from 'react';
import TaskCard from './task-card/TaskCard';
import axios from 'axios';
import NewTaskForm from './task-card/NewTaskForm';
import { SORT_OPTIONS_ENUM } from '@/utility/ENUM';

const TaskSection = ({ sectionName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
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
      className="w-6 h-6"
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
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );

  //api request with section name in a config data
  useEffect(() => {
    const getTaskRequest = async () => {
      const res = await axios.get('/api/tasks', {
        params: { sectionName },
      });
      const tasks = res.data;
      setIsLoaded(prev => setIsLoaded(!prev));
      setTasks(tasks);
    };

    getTaskRequest();
  }, []);

  let updownButton;

  if (updown === SORT_OPTIONS_ENUM.ascending) {
    updownButton = sortButtonUp;
  } else {
    updownButton = sortButtonDown;
  }

  let taskList;

  // sorting by select option
  const taskComponenteGenerate = selectOption => {
    let sortedTask = [...tasks];

    switch (selectOption) {
      case SORT_OPTIONS_ENUM.byLvl:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.level - b.level
            : b.level - a.level
        );

        break;
      case SORT_OPTIONS_ENUM.byClearRAte:
        sortedTask.forEach(
          task => (task.clearRate = task.timeCompleted / task.timeGenerated)
        );
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.clearRate - b.clearRate
            : b.clearRate - a.clearRate
        );
        break;
      case SORT_OPTIONS_ENUM.byDueDate:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.reset - b.reset
            : b.reset - a.reset
        );
        break;

      default:
        sortedTask.sort((a, b) =>
          updown === SORT_OPTIONS_ENUM.ascending
            ? a.createdAt - b.createdAt
            : b.createdAt - a.createdAt
        );
        break;
    }

    taskList = sortedTask;

    return;
  };

  // getting sorting option
  const getSortOptionHandler = e => {
    setSort(e.target.value);
  };

  // getting asc and desc option
  const getUpdownHandler = () => {
    setUpdown(!updown);
  };

  //updating task list after adding new task
  const addTaskFormSection = data => {
    const taskData = data.data;

    const newTasks = [taskData, ...tasks];
    setTasks(newTasks);
  };

  //removing selected task from section on delete
  const deleteTaskFromSection = id => {
    const newTasks = tasks.filter(task => task._id !== id);
    console.log(newTasks);
    setTasks(newTasks);
  };

  taskComponenteGenerate(sort);
  //return tasks.map(<TaskCard>)
  return (
    <section className=" min-h-screen w-96 block shadow-sm shadow-black">
      <h1 className="text-center border-b-2 pb-1 mx-2 border-gray-800">{`${sectionName.toUpperCase()}`}</h1>
      <div className="flex justify-end mb-4">
        <select onChange={getSortOptionHandler} className="bg-primary">
          <option>created</option>
          <option>level</option>
          <option>due date</option>
          <option>clear rate</option>
        </select>
        <button onClick={getUpdownHandler} className="bg-primary">
          {updownButton}
        </button>
      </div>

      {!isLoaded ? (
        loadingAnimation
      ) : (
        <div className="flex flex-col">
          {taskList.map(task => (
            <TaskCard
              task={task}
              key={task._id}
              deleteTaskFromSection={deleteTaskFromSection}
            />
          ))}
        </div>
      )}
      <NewTaskForm addTaskFormSection={addTaskFormSection} />
    </section>
  );
};

export default TaskSection;
