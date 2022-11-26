import React, { useReducer } from "react";
import { Link, useParams } from "react-router-dom";

import { FormActions } from "../../constants/formActions";

import { RootState, useAppDispatch } from "../../redux/store";
import { fetchAddPost, fetchUpdatePost } from "../../redux/post/asyncActions";
import { FetchPostParams } from "../../redux/post/types";
import { useSelector } from "react-redux";
import { selectPostById } from "../../redux/post/selectors";

import { Button, Card, Divider, Input } from "antd";

type FormState = {
  title: string;
  body: string;
};

type FormAction = {
  type: string;
  payload: string;
};

const reducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case FormActions.CHANGETITLE: {
      return {
        ...state,
        title: action.payload,
      };
    }
    case FormActions.CHANGETEXT: {
      return {
        ...state,
        body: action.payload,
      };
    }
    default:
      return state;
  }
};

export const NewPostForm: React.FC = () => {
  const appDispatch = useAppDispatch();

  const { postId } = useParams();
  const post = useSelector((state: RootState) => selectPostById(state, { postId: Number(postId) }));

  const [formState, formDispatch] = useReducer(reducer, {
    title: post?.title || "",
    body: post?.body || "",
  });

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({ type: FormActions.CHANGETITLE, payload: event.target.value });
  };

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    formDispatch({ type: FormActions.CHANGETEXT, payload: event.target.value });
  };

  const onSubmitPost = () => {
    if (postId) {
      appDispatch(
        fetchUpdatePost({
          ...formState,
          id: Number(postId),
        } as FetchPostParams),
      );
    } else {
      appDispatch(fetchAddPost(formState as FetchPostParams));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">Create a post</Divider>
      <Card title="Write a new post" style={{ margin: "10px" }}>
        <Input
          placeholder="Write title..."
          type="text"
          value={formState.title}
          onChange={onChangeTitle}
        />
        <Divider />
        <Input.TextArea
          style={{ height: "100px" }}
          placeholder="Write text..."
          value={formState.body}
          onChange={onChangeText}
        />
        <Button style={{ marginTop: "24px" }} type="primary" onClick={onSubmitPost}>
          {postId ? <span>Update post</span> : <span>Create new post</span>}
        </Button>
        <Link to="/posts">
          <Button style={{ marginTop: "24px", marginLeft: "24px" }}>Back to posts</Button>
        </Link>
      </Card>
    </div>
  );
};
