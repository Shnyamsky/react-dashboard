import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchDeletePhotos, fetchPhotos } from "./asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { PhotoItem } from "./types";

const photoEntityAdapter = createEntityAdapter<PhotoItem>();

const photoSlice = createSlice({
  name: "photo",
  initialState: photoEntityAdapter.getInitialState({
    status: LoadingStatuses.IDLE,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        photoEntityAdapter.setMany(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.SUCCESS
            : LoadingStatuses.ERROR;
      })
      .addCase(fetchDeletePhotos.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchDeletePhotos.fulfilled, (state, action) => {
        photoEntityAdapter.removeOne(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchDeletePhotos.rejected, (state, action) => {
        state.status = LoadingStatuses.ERROR;
      });
  },
});

export default photoSlice.reducer;
