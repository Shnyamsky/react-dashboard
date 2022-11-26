import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchPosts, fetchAddPost, fetchDeletePost, fetchUpdatePost } from "./asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { PostItem } from "./types";

const postEntityAdapter = createEntityAdapter<PostItem>({
  sortComparer: (a, b) => b.id - a.id,
});

const postSlice = createSlice({
  name: "post",
  initialState: postEntityAdapter.getInitialState({
    status: LoadingStatuses.IDLE,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.SUCCESS
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchAddPost.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchAddPost.fulfilled, (state, action) => {
        postEntityAdapter.addOne(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchAddPost.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchUpdatePost.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchUpdatePost.fulfilled, (state, action) => {
        postEntityAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchUpdatePost.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      })
      .addCase(fetchDeletePost.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        postEntityAdapter.removeOne(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchDeletePost.rejected, (state) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export default postSlice.reducer;
