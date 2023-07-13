import { taskActions } from '@/slices/taskSlice';
import { userAction } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import TaskSection from '@/components/task-section/TaskSection';
import { authOptions } from './api/auth/[...nextauth]';
import AddSection from '@/components/task-section/AddSection';

export default function Home({ data, session }) {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const [addSection, setAddSection] = useState(false);

  //init!
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const onCloseAddSection = () => {
    setAddSection(false);
  };

  const init = () => {
    dispatch(taskActions.loadTasks(data.taskData));
    dispatch(taskActions.getClearRate());
    dispatch(userAction.loadUser(data.userData));
  };

  let sectionContents;

  if (user.section) {
    const sectionNames = user.section;

    sectionContents =
      sectionNames.length >= 1
        ? sectionNames.map(sectionName => (
            <TaskSection sectionData={sectionName} key={sectionName._id} />
          ))
        : null;
  }

  return (
    <div className="flex">
      <TaskSection sectionData={{ title: 'user_data_name' }} />
      {sectionContents}
      {/* add section btn */}
      {addSection ? (
        <AddSection onClose={onCloseAddSection} />
      ) : (
        <button
          onClick={() => {
            setAddSection(prevState => !prevState);
          }}
          className="bg-ColorOne w-[400px] h-16 rounded-md mt-[60px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}
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
      `${process.env.DOMAIN}/api/user/email?email=${session.user.email}`
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
