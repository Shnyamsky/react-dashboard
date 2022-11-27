import { store } from "../store";
import { fetchAddPost, fetchDeletePost, fetchUpdatePost } from "../post/asyncActions";
import { PostItem } from "../post/types";

const addedPost = {
  userId: 1,
  title: "title",
  body: "title",
};

const updatedPost = {
  userId: 1,
  id: 1,
  title: "title",
  body: "body",
};

describe("Redux post tests", () => {
  test("fetch add post", async () => {
    const result = await store.dispatch(fetchAddPost(addedPost));
    const todos = result.payload as PostItem;

    expect(result.type).toBe("post/fetchAddPost/fulfilled");
    expect(todos).toEqual({ ...addedPost, id: 101 });
  });

  test("fetch update post", async () => {
    const result = await store.dispatch(fetchUpdatePost(updatedPost));
    const todos = result.payload as PostItem;

    expect(result.type).toBe("post/fetchUpdatePost/fulfilled");
    expect(todos).toEqual(updatedPost);
  });

  test("fetch delete post", async () => {
    const result = await store.dispatch(fetchDeletePost({ postId: 1 }));

    expect(result.type).toBe("post/fetchDeletePost/fulfilled");
  });
});
