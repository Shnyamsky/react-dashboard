import React from "react";

import { FloatButton, Layout } from "antd";
const { Content } = Layout;
import { LinkBreadcrumb } from "../../components";

type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Content style={{ margin: "15px 15px" }}>
        <LinkBreadcrumb />
        {children}
      </Content>
      <FloatButton.BackTop type="primary" visibilityHeight={1500} />
    </Layout>
  );
};
