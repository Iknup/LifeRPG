import NewTaskForm from '@/components/task-card/NewTaskForm';
import TaskCard from '@/components/task-card/TaskCard';

import TaskSection from '@/components/TaskSection';

const DUMMY_TASKS = [
  {
    _id: '01',
    description: 'Node JS 공부 끝내기',
    isComplete: 'false',
    level: '33',
    expEarned: 80,
    expNeed: 100,
    type: 'daily',
    totalCleared: 40,
    totalGenerated: 60,
  },
  {
    _id: '02',
    description: '수요일 교회 가기',
    isComplete: 'false',
    level: '02',
    expEarned: 6,
    expNeed: 10,
    type: 'weekly',
    totalCleared: 3,
    totalGenerated: 3,
  },
  {
    _id: '03',
    description: '운동 1시간',
    isComplete: 'false',
    level: '15',
    expEarned: 40,
    expNeed: 60,
    type: 'daily',
    totalCleared: 30,
    totalGenerated: 80,
  },
];

export default function Home() {
  const sectionNames = ['overall'];
  return (
    <div className="text-textPrimary flex flex-col">
      {sectionNames.map(sectionName => (
        <TaskSection sectionName={sectionName} key={sectionName} />
      ))}
      {/* <NewTaskForm />
      {DUMMY_TASKS.map(task => (
        <TaskCard task={task} key={task._id} />
      ))} */}
    </div>
  );
}

// 1. getServerSideProps (get server name)
// 2. TaskSection(Overall) /  map (TaskSection(sectioname)) / add section btn
