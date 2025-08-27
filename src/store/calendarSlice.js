import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    "01-09-2025": [
      { user: "user_1", value: 1 },
      { user: "user_2", value: 2 },
      { user: "user_3", value: 3 },
      { user: "user_4", value: 4 },
    ],
    "02-09-2025": [
      { user: "user_1", value: 5 },
      { user: "user_2", value: 6 },
      { user: "user_3", value: 2 },
      { user: "user_4", value: 8 },
    ],
  },
  selectedDate: null,
  selectedData: null,
  alert: "",
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    selectDate: (state, action) => {
      const date = action.payload;
      state.selectedDate = date;

      if (state.data[date]) {
        state.selectedData = state.data[date];
        state.alert = "";
      } else {
        state.selectedData = null;
        state.alert = "No data found for the selected date.";
      }
    },
    clearSelection: (state) => {
      state.selectedDate = null;
      state.selectedData = null;
      state.alert = "";
    },
  },
});

export const { selectDate, clearSelection } = calendarSlice.actions;
export default calendarSlice.reducer;
