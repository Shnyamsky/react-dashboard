import { LoadingStatuses } from "../../constants/loadingStatuses";
import { RootState } from "../store";

export const selectCommentModuleState = (state: RootState) => state.comment;

export const selectCommentIds = (state: RootState) =>
  selectCommentModuleState(state).ids as number[];
export const selectCommentEntities = (state: RootState) => selectCommentModuleState(state).entities;
export const selectCommentStatus = (state: RootState) => selectCommentModuleState(state).status;

export const selectCommentByPostId = (state: RootState, { postId }: { postId: number }) =>
  Object.fromEntries(
    Object.entries(selectCommentEntities(state)).filter(([key, item]) => item?.postId === postId),
  );
