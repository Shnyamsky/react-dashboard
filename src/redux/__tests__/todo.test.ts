import { store } from "../store";
import todoReducer, { changeCompleted } from "../todo/slice";
import { LoadingStatuses } from "../../constants/loadingStatuses";
import { fetchTodo } from "../todo/asyncActions";
import { TodoItem, TodoSliceState } from "../todo/types";

const getResponse = {
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false,
};
let state = {} as TodoSliceState;

describe("Redux todo tests", () => {
  beforeEach(() => {
    state = {
      todos: [
        {
          id: 1,
          userId: 1,
          title: "mock1",
          completed: true,
        },
        {
          id: 2,
          userId: 1,
          title: "mock2",
          completed: false,
        },
      ],
      status: LoadingStatuses.IDLE,
    };
  });

  test("change completed field", () => {
    const newState = todoReducer(state, changeCompleted(2));

    expect(newState.todos[0].completed).toBeTruthy();
    expect(newState.todos[1].completed).toBeTruthy();
  });

  test("fetch todos", async () => {
    const result = await store.dispatch(fetchTodo());
    const todos = result.payload as TodoItem[];

    expect(result.type).toBe("todo/fetchTodo/fulfilled");
    expect(todos[0]).toEqual(getResponse);
  });
});
