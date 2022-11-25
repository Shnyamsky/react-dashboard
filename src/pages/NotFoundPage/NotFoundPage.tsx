import React from "react";
import { Link } from "react-router-dom";

import { Button, Divider } from "antd";

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">NotFound</Divider>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Link to="/">
          <Button type="primary">Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
};
