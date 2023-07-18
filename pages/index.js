import { taskActions } from '@/slices/taskSlice';
import { userAction } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import TaskSection from '@/components/task-section/TaskSection';
import { authOptions } from './api/auth/[...nextauth]';
import AddSection from '@/components/task-section/AddSection';
import { GET_USER_BY_EMAIL } from '@/src/graphql/query/getUserByEmail';
import client from '@/lib/apollo-client';
import AddSectionButton from '@/icons/jsx/section/addSectionButton';

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

  if (user.sections) {
    const sectionNames = user.sections;

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
          className="flex items-center justify-center mb-40 ml-10"
        >
          <AddSectionButton />
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
    const email = session.user.email;
    console.log('UserPost');
    // const userRes = await axios.post(`${process.env.DOMAIN}/api/graphql`, {
    //   query: GET_USER_BY_EMAIL,
    //   variables: { email },
    // });

    const userRes = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: {
        email,
      },
      fetchPolicy: 'cache-first',
    });

    console.log('Post finished!');

    const userData = userRes.data.user;

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
