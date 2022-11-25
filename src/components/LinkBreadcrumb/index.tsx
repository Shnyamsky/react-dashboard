import React from "react";
import { useLocation } from "react-router-dom";

import { Breadcrumb } from "antd";

// TODO: rework this to Links
const getBreadcrumbItems = (pathname: string): string[] => {
  let items = pathname.split("/");
  items.splice(0, 1, "dashboard");
  if (items[1] === "") items[1] = "home";

  return items.map((item) => item[0].toUpperCase() + item.slice(1));
};

export const LinkBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Breadcrumb style={{ margin: "10px 0" }}>
      {getBreadcrumbItems(pathname).map((item, index) => (
        <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
