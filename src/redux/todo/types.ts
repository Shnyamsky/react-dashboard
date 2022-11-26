import { LoadingStatuses } from "../../constants/loadingStatuses";

export interface TodoSliceState {
  todos: TodoItem[];
  status: LoadingStatuses;
}

export type TodoItem = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type FetchTodoParams = {
  todoId: number;
};
