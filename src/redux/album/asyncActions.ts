import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { selectAlbumIds } from "./selectors";
import { AlbumItem } from "./types";
import { RootState } from "../store";

export const fetchAlbums = createAsyncThunk<AlbumItem[]>(
  "album/fetchAlbums",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    if (selectAlbumIds(state).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }

    const { data } = await axios.get<AlbumItem[]>(`https://jsonplaceholder.typicode.com/albums`);

    return data;
  },
);
