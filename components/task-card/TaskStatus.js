import PieChart from '../Charts/PieChart';
import DropAnimation from '../animation/DropAnimation';
import {
  differenceInDays,
  differenceInYears,
  format,
  monthsToYears,
  parseISO,
} from 'date-fns';

const TaskStatus = props => {
  const {
    clearRate,
    expPercent,
    nextLevelExp,
    experience,
    timesCompleted,
    timesGenereated,
    createdAt,
  } = props.statusData;
  const expChartData = {
    labels: ['exp', 'leftover'],
    datasets: [
      {
        data: [experience, nextLevelExp - experience],
        backgroundColor: ['#1DA9BF', '#46484C'],
      },
    ],
  };

  const now = new Date();

  const ageInDays = differenceInDays(now, parseISO(createdAt));
  const ageInYears = differenceInYears(now, parseISO(createdAt));

  const ageContent =
    ageInDays > 365 ? (
      <div className="text-btnReject">{`${ageInYears}years`}</div>
    ) : (
      <div className="text-colorMain">{`${ageInDays}days`}</div>
    );

  const clrRateChartData = {
    labels: ['Completed', 'Failure!'],
    datasets: [
      {
        data: [clearRate.toFixed(1), 100 - clearRate.toFixed(1)],
        backgroundColor: [' #26B577', '#46484C'],
      },
    ],
  };
  return (
    <DropAnimation>
      <div className="w-100% h-[150px] bg-ColorThree mx-3 rounded-b-md">
        <div className="flex w-full justify-between text-center">
          <div className="ml-1 flex">
            <div className="p-1 flex flex-col place-items-center mr-1">
              <h3>Exp</h3>
              <div className="w-[60px] h-[60px]">
                <PieChart chartData={expChartData} />
              </div>
              <p className="text-xs mt-1">
                {experience.toString().padStart(2, '0')}/
                {nextLevelExp.toString().padStart(2, '0')}
              </p>
            </div>
            <div className="p-1 flex flex-col place-items-center ">
              <h3 className="text-sm min-h-[24px] pt-[2px]">Clear rate</h3>
              <div className="w-[60px] h-[60px]">
                <PieChart chartData={clrRateChartData} />
              </div>
              <p className="text-xs mt-1">
                {timesCompleted.toString().padStart(2, '0')}/
                {timesGenereated.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-sm p-1 mt-1 mr-2 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
                />
              </svg>
              {format(parseISO(createdAt), 'yyyy/MM/dd')}
            </h3>
            <div className="text-sm p-1 mr-2">
              It's has been
              <br />
              {ageContent}
              after the task's birth!
            </div>
          </div>
        </div>
      </div>
    </DropAnimation>
  );
};

export default TaskStatus;
