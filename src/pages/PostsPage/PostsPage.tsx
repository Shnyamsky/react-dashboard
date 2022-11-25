import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectPostIds, selectPostStatus } from "../../redux/post/selectors";
import { fetchPosts } from "../../redux/post/asyncActions";

import { Button, Divider } from "antd";

import { Post } from "../../components";
import { PostSkeleton } from "../../components/Post/PostSkeleton";

import { LoadingStatuses } from "../../constants/loadingStatuses";

export const PostsPage: React.FC = () => {
  const appDispatch = useAppDispatch();

  const loadingStatus = useSelector(selectPostStatus);
  const ids = useSelector(selectPostIds);

  useEffect(() => {
    appDispatch(fetchPosts());
  }, []);

  const getPostsList = () => {
    return loadingStatus === LoadingStatuses.LOADING
      ? new Array(5).fill(null).map((_, index) => <PostSkeleton key={index} />)
      : ids.map((id) => <Post key={id} postId={id} />);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">Posts</Divider>
      <Link to="create">
        <Button style={{ margin: 10, width: "30%" }} type="primary">
          Add a new Post
        </Button>
      </Link>
      {getPostsList()}
    </div>
  );
};
