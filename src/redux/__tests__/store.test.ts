import { store } from "../store";
import { LoadingStatuses } from "../../constants/loadingStatuses";

describe("Redux state tests", () => {
  it("Post slice should initially set entities", () => {
    const state = store.getState().post;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual(LoadingStatuses.IDLE);
  });

  it("Comment slice should initially set entities", () => {
    const state = store.getState().comment;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual(LoadingStatuses.IDLE);
  });

  it("Album slice should initially set entities", () => {
    const state = store.getState().album;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual(LoadingStatuses.IDLE);
  });

  it("Photo slice should initially set entities", () => {
    const state = store.getState().photo;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.status).toEqual(LoadingStatuses.IDLE);
  });

  it("Todo slice should initially set entities", () => {
    const state = store.getState().todo;
    expect(state.todos).toEqual([]);
    expect(state.status).toEqual(LoadingStatuses.IDLE);
  });
});
