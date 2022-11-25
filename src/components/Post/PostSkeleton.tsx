import React from "react";
import { Skeleton } from "antd";

export const PostSkeleton: React.FC = () => {
  return (
    <div style={{ margin: "10px" }}>
      <Skeleton paragraph={{ rows: 2, width: "100%" }} active />
      <Skeleton.Input active size="large" />
    </div>
  );
};
