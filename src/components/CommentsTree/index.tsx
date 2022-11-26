import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectCommentByPostId, selectCommentStatus } from "../../redux/comment/selectors";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchComments } from "../../redux/comment/asyncActions";

import { Spin, Tree } from "antd";
import type { DataNode } from "antd/es/tree";

import { CommentItem } from "../../redux/comment/types";

type CommentMap = {
  [k: string]: CommentItem;
};

type CommentsTreeProps = {
  postId: number;
};

const getTreeData = (comments: CommentMap) => {
  const treeComments = Object.entries(comments);

  const list = treeComments.map(([commentKey, commentData]) => {
    const key = String(commentKey);
    const treeNode: DataNode = {
      key,
      title: (
        <>
          <h3>{commentData.email}</h3>
          <h1>{commentData.name}</h1>
          <p>{commentData.body}</p>
        </>
      ),
    };
    return treeNode;
  });

  return list;
};

export const CommentsTree: React.FC<CommentsTreeProps> = ({ postId }) => {
  const appDispatch = useAppDispatch();
  const comments = useSelector((state: RootState) => selectCommentByPostId(state, { postId }));
  const loadingStatus = useSelector(selectCommentStatus);

  useEffect(() => {
    appDispatch(fetchComments({ postId }));
  }, []);

  const treeData = getTreeData(comments as CommentMap);

  if (!treeData.length && loadingStatus === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spin />
      </div>
    );
  }

  if (!treeData.length) {
    return <div>Not any comments yet</div>;
  }

  return <Tree treeData={treeData} height={400} />;
};
