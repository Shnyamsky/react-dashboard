import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectCommentByPostId, selectCommentStatus } from "../../redux/comment/selectors";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchComments } from "../../redux/comment/asyncActions";

type CommentsTreeProps = {
  postId: number;
};

// TODO: rewrite this
import { Spin, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { CommentItem } from "../../redux/comment/types";
type CommentMap = {
  [k: string]: CommentItem | undefined;
};

const dig = (comments: CommentMap = {}) => {
  const list = [];
  const treeComments = Object.entries(comments);

  if (treeComments.length > 0) {
    const key = "0";
    const treeNode: DataNode = {
      key,
      title: (
        <>
          <h3>{treeComments[0][1]?.email}</h3>
          <h1>{treeComments[0][1]?.name}</h1>
          <p>{treeComments[0][1]?.body}</p>
        </>
      ),
    };

    treeComments.splice(0, 1);

    treeNode.children = treeComments?.map(([commentKey, commentData]) => {
      const key = String(commentKey);
      const treeNode: DataNode = {
        key,
        title: (
          <>
            <h3>{commentData?.email}</h3>
            <h1>{commentData?.name}</h1>
            <p>{commentData?.body}</p>
          </>
        ),
      };
      return treeNode;
    });

    list.push(treeNode);
  }

  return list;
};

export const CommentsTree: React.FC<CommentsTreeProps> = ({ postId }) => {
  const appDispatch = useAppDispatch();
  const comments = useSelector((state: RootState) => selectCommentByPostId(state, { postId }));
  const loadingStatus = useSelector(selectCommentStatus);

  useEffect(() => {
    appDispatch(fetchComments({ postId }));
  }, []);

  //TODO: rewrite this
  const treeData = dig(comments);

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
