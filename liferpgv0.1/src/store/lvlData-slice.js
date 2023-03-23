import { createSlice } from '@reduxjs/toolkit';

const levelData = {
  levels: [
    { level: 1, id: 'lv1', minEXP: 0 },
    { level: 2, id: 'lv2', minEXP: 2 },
    { level: 3, id: 'lv3', minEXP: 6 },
    { level: 4, id: 'lv4', minEXP: 12 },
    { level: 5, id: 'lv5', minEXP: 16 },
    { level: 6, id: 'lv6', minEXP: 26 },
    { level: 7, id: 'lv7', minEXP: 38 },
    { level: 8, id: 'lv8', minEXP: 52 },
    { level: 9, id: 'lv9', minEXP: 68 },
    { level: 10, id: 'lv10', minEXP: 86 },
  ],
};

const lvlDataSlice = createSlice({
  name: 'levelData',
  initialState: levelData,
  reducers: {
    // getLevel(state, action) {
    //   console.log('action', action);
    //   const exp = action.payload.exp;
    //   console.log('state', state);
    //   const level = state.levels.find(level => level.minEXP =< exp);
    //   // const level = { level: 1, totalExp: 0, id: 'lv1', minEXP: 0 };
    //   level.level;
    // },
  },
});

export const lvlDataAction = lvlDataSlice.actions;

export default lvlDataSlice.reducer;
