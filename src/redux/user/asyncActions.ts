import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { selectUserIds } from "./selectors";
import { UserItem } from "./types";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<UserItem[]>("user/fetchUsers", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  if (selectUserIds(state).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
  }

  const { data } = await axios.get<UserItem[]>(`https://jsonplaceholder.typicode.com/users`);

  return data;
});
