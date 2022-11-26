import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { BarsOutlined, PictureOutlined, CheckSquareOutlined } from "@ant-design/icons";

import { ContentLayout } from "../ContentLayout/ContentLayout";

const TitleStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 10,
  marginTop: 15,
  display: "flex",
  justifyContent: "center",
  fontSize: "20px",
};

const items = [
  { label: "Posts", key: "/posts", icon: <BarsOutlined /> },
  { label: "Albums", key: "/albums", icon: <PictureOutlined /> },
  { label: "Todos", key: "/todos", icon: <CheckSquareOutlined /> },
];

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        {collapsed ? (
          <div style={{ width: 80, ...TitleStyle }}>
            <h1>DB</h1>
          </div>
        ) : (
          <div style={{ width: 200, ...TitleStyle }}>
            <h1>Dashboard</h1>
          </div>
        )}
        <Menu
          style={{
            marginTop: 50,
            position: "fixed",
            maxWidth: 200,
          }}
          theme="light"
          mode="inline"
          onClick={({ key }) => {
            window.scrollTo(0, 0);
            navigate(key);
          }}
          items={items}
        />
      </Sider>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </Layout>
  );
};
