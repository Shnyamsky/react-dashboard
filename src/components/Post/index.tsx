import React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "../../redux/post/selectors";
import { RootState, useAppDispatch } from "../../redux/store";

import { CommentsTree } from "../CommentsTree";

import { Button, Card, Collapse } from "antd";
import { fetchDeletePost } from "../../redux/post/asyncActions";

const { Panel } = Collapse;

type PostProps = {
  postId: number;
};

export const Post: React.FC<PostProps> = ({ postId }) => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const post = useSelector((state: RootState) => selectPostById(state, { postId }));

  const onClickDelete = () => {
    if (window.confirm("Хотите удалить?")) {
      appDispatch(fetchDeletePost({ postId }));
    }
  };

  const onClickEdit = () => {
    navigate(`${postId}/edit`);
  };

  if (!post) {
    return null;
  }

  return (
    <Card
      title={post.title}
      style={{ margin: "10px" }}
      extra={
        <>
          <Button style={{ marginRight: 10 }} onClick={onClickEdit}>
            Edit
          </Button>
          <Button danger onClick={onClickDelete}>
            Delete
          </Button>
        </>
      }>
      <p>{post.body}</p>
      <Collapse>
        <Panel header="Comments" key="1">
          <CommentsTree postId={post.id} />
        </Panel>
      </Collapse>
    </Card>
  );
};
