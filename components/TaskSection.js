import { useState, useEffect } from 'react';
import TaskCard from './task-card/TaskCard';
import axios from 'axios';

const TaskSection = ({ sectionName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
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
    return () => {};
  }, []);

  //return tasks.map(<TaskCard>)
  return (
    <section className=" min-h-screen w-96 block shadow-sm shadow-black">
      <h1 className="text-center border-b-2 pb-1 mx-2 border-gray-800">{`${sectionName.toUpperCase()}`}</h1>

      {!isLoaded ? (
        loadingAnimation
      ) : (
        <div className="flex flex-col">
          {tasks.map(task => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskSection;
