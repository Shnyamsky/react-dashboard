import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoadingStatuses } from "../../constants/loadingStatuses";
import { selectCommentByPostId } from "./selectors";
import { CommentItem, FetchCommentsParams } from "./types";
import { RootState } from "../store";

export const fetchComments = createAsyncThunk<CommentItem[], FetchCommentsParams>(
  "comment/fetchComments",
  async ({ postId }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const commentByPostId = selectCommentByPostId(state, { postId });
    if (Object.values(commentByPostId).length > 0) {
      return thunkAPI.rejectWithValue(LoadingStatuses.EARLYADDED);
    }

    const { data } = await axios.get<CommentItem[]>(
      `https://jsonplaceholder.typicode.com/comments/?postId=${postId}`,
    );

    return data;
  },
);
