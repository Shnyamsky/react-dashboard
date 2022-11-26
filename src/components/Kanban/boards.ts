import { TodoItem } from "../../redux/todo/types";

export type Board = {
  id: string;
  title: string;
  tasks: TodoItem[];
};

export const boards: Board[] = [
  {
    id: "1",
    title: "ToDo",
    tasks: [],
  },
  {
    id: "2",
    title: "Completed",
    tasks: [],
  },
];
