import { RootState } from "../store";

export const selectTodoModuleState = (state: RootState) => state.todo;

export const selectTodoStatus = (state: RootState) => selectTodoModuleState(state).status;

export const selectTodoItems = (state: RootState) => selectTodoModuleState(state).todos;

export const selectTodoIds = (state: RootState) =>
  selectTodoModuleState(state).todos.reduce((accum, todo) => [...accum, todo.id], [] as number[]);

export const selectCompletedTodo = (state: RootState) =>
  selectTodoModuleState(state).todos.filter((todo) => todo.completed);

export const selectUncompletedTodo = (state: RootState) =>
  selectTodoModuleState(state).todos.filter((todo) => !todo.completed);

export const selectTodoById = (state: RootState, { todoId }: { todoId: number }) =>
  selectTodoModuleState(state).todos.find((todo) => todo.id === todoId);
