import { createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchComments } from "./asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { CommentItem } from "./types";

const commentEntityAdapter = createEntityAdapter<CommentItem>();

const commentSlice = createSlice({
  name: "comment",
  initialState: commentEntityAdapter.getInitialState({
    status: LoadingStatuses.IDLE,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        commentEntityAdapter.setMany(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.SUCCESS
            : LoadingStatuses.ERROR;
      });
  },
});

export default commentSlice.reducer;
