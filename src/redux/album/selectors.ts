import { RootState } from "../store";

export const selectAlbumModuleState = (state: RootState) => state.album;

export const selectAlbumIds = (state: RootState) => selectAlbumModuleState(state).ids as number[];
export const selectAlbumEntities = (state: RootState) => selectAlbumModuleState(state).entities;
export const selectAlbumStatus = (state: RootState) => selectAlbumModuleState(state).status;

export const selectAlbumById = (state: RootState, { albumId }: { albumId: number }) =>
  selectAlbumEntities(state)[albumId];
