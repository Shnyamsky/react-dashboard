import { LoadingStatuses } from "../../constants/loadingStatuses";
import { RootState } from "../store";

export const selectPhotoModuleState = (state: RootState) => state.photo;

export const selectPhotoIds = (state: RootState) => selectPhotoModuleState(state).ids as number[];
export const selectPhotoEntities = (state: RootState) => selectPhotoModuleState(state).entities;
export const selectPhotoStatus = (state: RootState) => selectPhotoModuleState(state).status;

export const selectPhotoByAlbumId = (state: RootState, { albumId }: { albumId: number }) =>
  Object.fromEntries(
    Object.entries(selectPhotoEntities(state)).filter(([key, item]) => item?.albumId === albumId),
  );
