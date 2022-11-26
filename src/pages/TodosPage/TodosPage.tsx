import React, { useEffect } from "react";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectTodoStatus } from "../../redux/todo/selectors";
import { fetchTodo } from "../../redux/todo/asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";

import { Button, Divider, Spin } from "antd";

import { Kanban } from "../../components";

export const TodosPage: React.FC = () => {
  const appDispatch = useAppDispatch();

  const loadingStatus = useSelector(selectTodoStatus);

  useEffect(() => {
    appDispatch(fetchTodo());
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">Todo</Divider>
      {loadingStatus === LoadingStatuses.LOADING ? <Spin /> : <Kanban />}
    </div>
  );
};
