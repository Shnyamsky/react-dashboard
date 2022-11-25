import { createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchUsers } from "./asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { UserItem } from "./types";

const userEntityAdapter = createEntityAdapter<UserItem>();

const userSlice = createSlice({
  name: "user",
  initialState: userEntityAdapter.getInitialState({
    status: LoadingStatuses.IDLE,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        userEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.SUCCESS
            : LoadingStatuses.ERROR;
      });
  },
});

export default userSlice.reducer;
