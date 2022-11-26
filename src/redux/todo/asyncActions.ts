import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoadingStatuses } from "../../constants/loadingStatuses";

import { RootState } from "../store";
import { selectTodoById, selectTodoIds } from "./selectors";
import { FetchTodoParams, TodoItem } from "./types";

export const fetchTodo = createAsyncThunk<TodoItem[]>("todo/fetchTodo", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  if (selectTodoIds(state).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
  }

  const { data } = await axios.get<TodoItem[]>(`https://jsonplaceholder.typicode.com/todos`);

  return data;
});

export const fetchUpdateTodo = createAsyncThunk<TodoItem, FetchTodoParams>(
  "todo/fetchUpdateTodo",
  async ({ todoId }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const todoItem = selectTodoById(state, { todoId });

    const { data } = await axios.put<TodoItem>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      todoItem,
    );

    return data;
  },
);
