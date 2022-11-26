import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchAlbums } from "./asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { AlbumItem } from "./types";

const albumEntityAdapter = createEntityAdapter<AlbumItem>();

const albumSlice = createSlice({
  name: "album",
  initialState: albumEntityAdapter.getInitialState({
    status: LoadingStatuses.IDLE,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatuses.LOADING;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        albumEntityAdapter.addMany(state, action.payload);
        state.status = LoadingStatuses.SUCCESS;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status =
          action.payload === LoadingStatuses.EARLYADDED
            ? LoadingStatuses.SUCCESS
            : LoadingStatuses.ERROR;
      });
  },
});

export default albumSlice.reducer;
