import { LoadingStatuses } from "../../constants/loadingStatuses";
import { RootState } from "../store";

export const selectUserModuleState = (state: RootState) => state.user;

export const selectUserIds = (state: RootState) => selectUserModuleState(state).ids as number[];
export const selectUserEntities = (state: RootState) => selectUserModuleState(state).entities;
export const selectUserStatus = (state: RootState) => selectUserModuleState(state).status;

export const selectUserById = (state: RootState, { userId }: { userId: number }) =>
  selectUserEntities(state)[userId];
