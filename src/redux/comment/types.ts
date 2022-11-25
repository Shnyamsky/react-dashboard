export type CommentItem = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type FetchCommentsParams = {
  postId: number;
};
