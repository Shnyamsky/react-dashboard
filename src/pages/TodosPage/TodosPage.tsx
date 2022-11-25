import React from "react";

import { Divider } from "antd";

import { Kanban } from "../../components";

export const TodosPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">Todo</Divider>
      <Kanban />
    </div>
  );
};
