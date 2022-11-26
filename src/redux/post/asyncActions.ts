import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { selectPostIds } from "./selectors";
import { PostItem, FetchPostParams, FetchDeletePostParams } from "./types";
import { RootState } from "../store";

export const fetchPosts = createAsyncThunk<PostItem[]>("post/fetchPosts", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  if (selectPostIds(state).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
  }

  const { data } = await axios.get<PostItem[]>(`https://jsonplaceholder.typicode.com/posts`);

  return data;
});

export const fetchAddPost = createAsyncThunk<PostItem, FetchPostParams>(
  "post/fetchAddPost",
  async ({ title, body, userId = 1 }) => {
    const postItem = {
      title,
      body,
      userId,
    };

    const { data } = await axios.post<PostItem>(
      `https://jsonplaceholder.typicode.com/posts`,
      postItem,
    );

    return data;
  },
);

export const fetchUpdatePost = createAsyncThunk<PostItem, FetchPostParams>(
  "post/fetchUpdatePost",
  async ({ title, body, id, userId }) => {
    const postItem = {
      title,
      body,
      id,
      userId,
    };

    const { data } = await axios.put<PostItem>(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      postItem,
    );

    return data;
  },
);

export const fetchDeletePost = createAsyncThunk<number, FetchDeletePostParams>(
  "post/fetchDeletePost",
  async ({ postId }) => {
    await axios.delete<PostItem>(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    return postId;
  },
);
