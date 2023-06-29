import { taskActions } from '@/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import TaskSection from '@/components/TaskSection';

export default function Home({ data }) {
  const sectionNames = ['overall'];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskActions.loadTasks(data));
    dispatch(taskActions.getClearRate());
    return () => {};
  }, []);

  return (
    <div className="flex flex-col">
      {sectionNames.map(sectionName => (
        <TaskSection sectionName={sectionName} key={sectionName} />
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  await axios.patch(`${process.env.DOMAIN}/api/task/resetTimer`);

  const res = await axios.get(`${process.env.DOMAIN}/api/tasks`);
  const taskData = res.data;

  return {
    props: { data: taskData },
  };
};

// 1. getServerSideProps (get server name)
// 2. TaskSection(Overall) /  map (TaskSection(sectioname)) / add section btn
