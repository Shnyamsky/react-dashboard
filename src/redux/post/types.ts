export type PostItem = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type FetchPostParams = {
  title: string;
  body: string;
  id?: number;
  userId: number;
};

export type FetchDeletePostParams = {
  postId: number;
};
