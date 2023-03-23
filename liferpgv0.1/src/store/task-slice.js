import { createSlice } from '@reduxjs/toolkit';
import { levelData } from './levelData';

const DUMMY_DATA = [
  {
    id: 't1',
    title: '운동',
    description: '하루에 1시간씩',
    initDate: Date(2023, 2, 3),
    type: 'daily',
    generatedAmount: 13,
    clearedAmount: 10,
    isCleared: false,
    levelData: {
      exp: 20,
      level: 5,
      id: 'lv5',
      minEXP: 16,
      nextLevel: 26,
    },
  },
  {
    id: 't2',
    title: 'React 공부',
    description: '하루에 4시간씩',
    initDate: Date(2023, 1, 1),
    type: 'daily',
    generatedAmount: 43,
    clearedAmount: 40,
    isCleared: false,
    levelData: {
      exp: 80,
      level: 9,
      id: 'lv9',
      minEXP: 68,
      nextLevel: 86,
    },
  },
];

const getClearRate = (x, y) => Math.round((x / y) * 100);
const getLevel = () => {};

DUMMY_DATA.forEach(
  data =>
    (data.clearedRate = getClearRate(data.clearedAmount, data.generatedAmount))
);

const initialState = {
  tasks: DUMMY_DATA,
  unclearedTasks: [],
  levels: levelData,
};

console.log(initialState.levels);

// const taskIndexFinder = (tasks, id) => {
//   const targetTask = tasks.find(task => task.id === id);
//   const targetIndex = tasks.indexOf(targetTask);

//   return targetIndex;
// };

const taskSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {
    renderPrep(state) {
      const unclearedTasks = state.tasks.filter(
        task => task.isCleared === false
      );
      unclearedTasks.forEach(task => task.generatedAmount++);
    },
    addTask(state, action) {
      const newTask = action.payload;
      const newTaskForm = {
        title: newTask.title,
        description: newTask.description,
        initDate: newTask.initDate.toString(),
        clearedAmount: newTask.clearedAmount,
        generatedAmount: newTask.generatedAmount,
        id: newTask.id,
        isCleared: false,
        clearedRate: getClearRate(
          newTask.clearedAmount,
          newTask.generatedAmount
        ),
        levelData: {
          ...state.levels.levels[0],
          exp: 0,
          nextLevel: state.levels.levels[1].minEXP,
        },
      };
      state.tasks.push(newTaskForm);
    },
    removeTask(state, action) {
      const targetTask = state.tasks.find(task => task.id === action.payload);
      const targetIndex = state.tasks.indexOf(targetTask);
      state.tasks.splice(targetIndex, 1);
    },
    clearTask(state, action) {
      const targetTask = state.tasks.find(task => task.id === action.payload);

      // Updating cleared rate
      targetTask.clearedAmount++;
      targetTask.isCleared = true;
      targetTask.clearedRate = getClearRate(
        targetTask.clearedAmount,
        targetTask.generatedAmount
      );

      // Updating exp and checking level
      const { levelData } = targetTask;
      levelData.exp += 2;
      if (levelData.exp >= levelData.nextLevel) {
        const nextLevelIndex = state.levels.levels.findIndex(
          level => level.minEXP > levelData.exp
        );
        const updatedLevel = state.levels.levels[nextLevelIndex - 1];
        const nextLevel = state.levels.levels[nextLevelIndex];

        targetTask.levelData = {
          exp: levelData.exp,
          nextLevel: nextLevel.minEXP,
          ...updatedLevel,
        };
      }
    },
    // getLevel(state, action) {
    //   const lvlData = action.payload.lvlData;
    //   const targetTask = state.tasks.find(
    //     task => task.id === action.payload.id
    //   );
    //   const targetLevelIndex = lvlData.findIndex(level => {
    //     return level.minEXP > targetTask.exp;
    //   });
    //   console.log(targetTask, targetLevelIndex);
    // },
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
