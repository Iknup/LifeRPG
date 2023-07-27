import { taskActions } from '@/slices/taskSlice';
import { editUser, userAction } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import TaskSection from '@/components/task-section/TaskSection';
import { authOptions } from './api/auth/[...nextauth]';
import AddSection from '@/components/task-section/AddSection';
import AddSectionButton from '@/icons/jsx/section/AddSectionButton';
import { getTimezoneOffset } from 'date-fns-tz';

export default function Home({ data, session }) {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const [addSection, setAddSection] = useState(false);

  // Checking user's timezone
  useEffect(() => {
    const getTimezone = () => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = getTimezoneOffset(userTimezone);
      return { timezoneString: userTimezone, offset };
    };
    if (!session.user.timezone) {
      const userTimezone = getTimezone();
      dispatch(
        editUser({ data: { timezone: userTimezone }, userId: session.user._id })
      );
    }
    dispatch(taskActions.loadTasks(data.taskData));
    dispatch(taskActions.getClearRate());
    dispatch(userAction.loadUser({ ...session.user, sections: data.sections }));

    return () => {};
  }, [session.user.timezone, dispatch, session.user._id]);

  const onCloseAddSection = () => {
    setAddSection(false);
  };

  // const userTimezone = Intl

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
    <Fragment>
      <div className="flex">
        <TaskSection
          sectionData={{ title: session.user.name, _id: undefined }}
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
      </div>
      <div id="portal-root"></div>
    </Fragment>
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
    // Getting sections
    const sectionRes = await axios.get(
      `${process.env.DOMAIN}/api/user/section?userId=${session.user._id}`
    );

    const sectionData = sectionRes.data;

    // Resetting tasks
    // await axios.patch(
    //   `${process.env.DOMAIN}/api/task/resetTimer?userId=${userData._id}`
    // );

    // Getting tasks
    const res = await axios.get(
      `${process.env.DOMAIN}/api/task?userId=${session.user._id}`
    );
    const taskData = res.data;

    return {
      props: { session, data: { taskData, sections: sectionData } },
    };
  }
};

// 1. getServerSideProps (get server name)
// 2. TaskSection(Overall) /  map (TaskSection(sectioname)) / add section btn
