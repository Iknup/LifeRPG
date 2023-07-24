import { taskActions } from '@/slices/taskSlice';
import { userAction } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import TaskSection from '@/components/task-section/TaskSection';
import { authOptions } from './api/auth/[...nextauth]';
import AddSection from '@/components/task-section/AddSection';
import AddSectionButton from '@/icons/jsx/section/AddSectionButton';
import TaskCardDragLayer from '@/components/UI/TaskCardDragLayer';

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

  if (user.sections && user.sections.length >= 1) {
    const sections = user.sections;

    sectionContents =
      sections.length >= 1
        ? sections.map(section => (
            <TaskSection sectionData={section} key={section._id} />
          ))
        : null;
  }

  return (
    <div className="flex">
      <TaskSection
        sectionData={{ title: data.userData.name, _id: undefined }}
      />
      {sectionContents}
      {/* add section btn */}
      {addSection ? (
        <AddSection onClose={onCloseAddSection} />
      ) : (
        <div className="task-section flex items-center justify-center">
          <button
            onClick={() => {
              setAddSection(prevState => !prevState);
            }}
            className="mb-40"
          >
            <AddSectionButton />
          </button>
        </div>
      )}
      {/* <TaskCardDragLayer /> */}
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
    const email = session.user.email;

    // getting userData by email
    const userRes = await axios.get(
      `${process.env.DOMAIN}/api/user/email?email=${email}`
    );

    const userData = userRes.data;

    // Getting sections
    const sectionRes = await axios.get(
      `${process.env.DOMAIN}/api/user/section?userId=${userData._id}`
    );

    const sectionData = sectionRes.data;

    // Resetting tasks
    // await axios.patch(
    //   `${process.env.DOMAIN}/api/task/resetTimer?userId=${userData._id}`
    // );

    // Getting tasks
    const res = await axios.get(
      `${process.env.DOMAIN}/api/task?userId=${userData._id}`
    );
    const taskData = res.data;

    const user = { ...userRes.data, sections: sectionData };

    return {
      props: { session, data: { taskData, userData: user } },
    };
  }
};

// 1. getServerSideProps (get server name)
// 2. TaskSection(Overall) /  map (TaskSection(sectioname)) / add section btn
