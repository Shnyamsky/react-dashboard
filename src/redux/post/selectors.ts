import { RootState } from "../store";

export const selectPostModuleState = (state: RootState) => state.post;

export const selectPostIds = (state: RootState) => selectPostModuleState(state).ids as number[];
export const selectPostEntities = (state: RootState) => selectPostModuleState(state).entities;
export const selectPostStatus = (state: RootState) => selectPostModuleState(state).status;

export const selectPostById = (state: RootState, { postId }: { postId: number }) =>
  selectPostEntities(state)[postId];
