import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default todoSlice.reducer;
