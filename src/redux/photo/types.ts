export type PhotoItem = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type FetchPhotosParams = {
  albumId: number;
};

export type FetchDeletePhotosParams = {
  photoId: number;
};
