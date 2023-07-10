import { taskActions } from '@/slices/taskSlice';
import { userAction } from '@/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import TaskSection from '@/components/TaskSection';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home({ data, session }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskActions.loadTasks(data.taskData));
    dispatch(taskActions.getClearRate());
    dispatch(userAction.loadUser(data.userData));
    return () => {};
  }, []);

  return (
    <div className="flex flex-col">
      <TaskSection sectionName={'user_data_name'} />
      {/* {sectionNames.map(sectionName => (
        <TaskSection sectionName={sectionName} key={sectionName} />
      ))} */}
    </div>
  );
}

export const getServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/signInPage',
        permanent: false,
      },
    };
  } else {
    const userRes = await axios.get(
      `${process.env.DOMAIN}/api/user/${session.user.email}`
    );

    const userData = userRes.data;

    await axios.patch(
      `${process.env.DOMAIN}/api/task/resetTimer?userId=${userData._id}`
    );

    const res = await axios.get(
      `${process.env.DOMAIN}/api/task?userId=${userData._id}`
    );
    const taskData = res.data;

    return {
      props: { session, data: { taskData, userData } },
    };
  }
};

// 1. getServerSideProps (get server name)
// 2. TaskSection(Overall) /  map (TaskSection(sectioname)) / add section btn
