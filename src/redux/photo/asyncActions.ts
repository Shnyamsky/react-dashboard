import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { selectPhotoByAlbumId } from "./selectors";
import { PhotoItem, FetchPhotosParams, FetchDeletePhotosParams } from "./types";
import { RootState } from "../store";

export const fetchPhotos = createAsyncThunk<PhotoItem[], FetchPhotosParams>(
  "photo/fetchPhotos",
  async ({ albumId }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const photoByAlbumId = selectPhotoByAlbumId(state, { albumId });
    if (Object.values(photoByAlbumId).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }

    const { data } = await axios.get<PhotoItem[]>(
      `https://jsonplaceholder.typicode.com/photos/?albumId=${albumId}`,
    );

    return data;
  },
);

export const fetchDeletePhotos = createAsyncThunk<number, FetchDeletePhotosParams>(
  "photo/fetchDeletePhotos",
  async ({ photoId }) => {
    await axios.delete<PhotoItem>(`https://jsonplaceholder.typicode.com/photos/${photoId}`);

    return photoId;
  },
);
