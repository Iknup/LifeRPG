import { formatISO, subDays } from 'date-fns';
import { useEffect } from 'react';
import TaskInfo from '@/components/task-card/TaskInfo';
import Dot from '@/icons/jsx/Dot';
import RPGCheck from '@/icons/jsx/RPGCheck';
import LogoVertical from '@/icons/jsx/LogoVertical';
import Image from 'next/image';
import { editUser } from '@/slices/userSlice';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useDispatch } from 'react-redux';
import { getTimezoneOffset } from 'date-fns-tz';

const AboutPage = ({ session }) => {
  const dispatch = useDispatch();
  const DUMMY_DATA = {
    description: 'Study',
    isComplete: false,
    isRPG: true,
    repeat: 'Daily',
    level: 33,
    experience: 446,
    timeCompleted: 223,
    timeGenerated: 333,
    createdAt: formatISO(subDays(new Date(), 333)),
    get clearRate() {
      return this.timeCompleted / this.timeGenerated;
    },
  };

  useEffect(() => {
    const getTimezone = () => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = getTimezoneOffset(userTimezone);
      return { timezoneString: userTimezone, offset };
    };

    if (!session.user.timezone) {
      const userTimezone = getTimezone();
      dispatch(
        editUser({
          data: { timezone: userTimezone, resetSchedule: 2 },
          userId: session.user._id,
        })
      );
    }
  }, [session.user, dispatch]);

  return (
    <div className="w-full 2xl:w-[30%] lg:w-[50%]">
      <h1 className="text-3xl font-bold mx-2 mb-2">About</h1>
      <div className="mx-2 bg-ColorOne rounded-md p-1">
        <h3 className="text-xl">RPG Task</h3>
        <p>
          반복되는 할일들을 RPG Task화 하여 반복/완료 횟수를 그래프 및 레벨로
          확인해보세요
        </p>
        <div className="lg:flex">
          <div className="lg:w-[370px] mt-5">
            <TaskInfo task={DUMMY_DATA} />
          </div>
          <p className="text-[12px] text-colorMain mt-auto mb-5">
            {'<= 가운데 아래 화살표 버튼을 클릭해보세요'}
          </p>
        </div>
      </div>
      <div className="mx-2 bg-ColorOne rounded-md mt-5 p-1">
        <h3 className="text-xl">How to</h3>
        <Image
          src="/TutorialImg01.png"
          alt="Tutorial-img"
          width={300}
          height={400}
          className="mt-2 ml-2"
        />
        <ol className="mt-2 ml-2">
          <li className="flex">
            1.
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <p className="text-sm lg:text-base">
              버튼을 클릭하여 원하는 날짜와 반복(REPEAT) 타입을 설정해주세요.
            </p>
          </li>
          <li className="mx-1 lg:ml-3 bg-ColorFour p-1 w-fit rounded-sm">
            <h1 className="flex items-center text-sm lg:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-6 text-colorMain"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              반복(REPEAT) 타입 설정 시 주의사항
            </h1>
            <ul>
              <li className="flex text-sm lg:text-base">
                <Dot />
                <p>Daily: 매일 반복</p>
              </li>
              <li className="flex text-sm lg:text-base">
                <Dot />
                <p>Every weekdays: 주중 반복</p>
              </li>
              <li className="flex text-sm lg:text-base">
                <Dot />
                <p>Every selectedDays: 최대 7일까지 설정가능</p>
              </li>
              <li className="flex text-sm lg:text-base">
                <Dot />
                <p>Monthly: 최대 1일까지 설정가능</p>
              </li>
            </ul>
          </li>
          <li className="flex items-center mt-2 text-sm lg:text-base">
            2. <RPGCheck /> <p>버튼을 클릭하여 RPG Task </p>
            <RPGCheck active={true} />
            <p>{'로 만드세요'}</p>
          </li>
        </ol>
      </div>

      <div className="mx-2 bg-ColorOne rounded-md mt-5 pt-1 px-1 pb-3">
        <h3 className="text-xl">{"Let's Start"}</h3>
        <div className="flex items-center">
          <p className="mr-2 text-sm lg:text-base">
            왼쪽 상단
            <LogoVertical scale={{ w: '91', h: '25' }} />
            로고를 클릭해서 첫 할일을 만들어 보세요!
          </p>
        </div>
      </div>

      <div
        className="text-sm lg:text-base mt-5
      lg:absolute lg:bottom-0 lg:right-0 text-ColorSix"
      >
        미래는 지금과 과거의 내가 만드는 작품이다.
      </div>
    </div>
  );
};

export default AboutPage;

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

    return {
      props: { session },
    };
  }
};
