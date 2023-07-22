import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  options: { repeat: 'None', selectedDays: [], sectionId: '' },
};

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    addOptions(state, action) {
      state.options = action.payload;
    },
    deleteOptions(state, action) {
      state.options = { repeat: 'None', selectedDays: [], sectionId: '' };
    },
  },
});

export const optionActions = optionSlice.actions;

export default optionSlice.reducer;
