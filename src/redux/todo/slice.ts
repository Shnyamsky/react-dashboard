import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchTodo, fetchUpdateTodo } from "./asyncActions";
import { TodoSliceState } from "./types";

import { LoadingStatuses } from "../../constants/loadingStatuses";

const initialState: TodoSliceState = {
  todos: [],
  status: LoadingStatuses.IDLE,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    changeCompleted(state, action: PayloadAction<number>) {
      const findTodo = state.todos.find((todo) => todo.id === action.payload);
      if (findTodo) {
        findTodo.completed = !findTodo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = LoadingStatuses.SUCCESS;
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.SUCCESS
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchUpdateTodo.pending, () => {
        console.log("status: loading");
      })
      .addCase(fetchUpdateTodo.fulfilled, (_, action) => {
        console.log("status: succsess", action.payload);
      })
      .addCase(fetchUpdateTodo.rejected, () => {
        console.log("status: error");
      });
  },
});

export const { changeCompleted } = todoSlice.actions;

export default todoSlice.reducer;
