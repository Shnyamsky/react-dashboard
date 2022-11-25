import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import user from "./user/slice";
import post from "./post/slice";
import album from "./album/slice";
import todo from "./todo/slice";
import comment from "./comment/slice";
import photo from "./photo/slice";

export const store = configureStore({
  reducer: {
    user,
    post,
    comment,
    album,
    photo,
    todo,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
