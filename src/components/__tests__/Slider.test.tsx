import { Slider } from "../index";
import { render, screen, fireEvent } from "@testing-library/react";

const mocks = [
  {
    id: 1,
    title: "mock1",
    url: "",
    thumbnailUrl: "",
  },
  {
    id: 2,
    title: "mock2",
    url: "",
    thumbnailUrl: "",
  },
];

describe("Slider tests", () => {
  beforeEach(() => {
    render(
      <Slider>
        {mocks.map((mock) => {
          return (
            <div key={mock.id}>
              <h1
                style={{
                  position: "absolute",
                  color: "#fff",
                  bottom: "15px",
                  display: "flex",
                }}>
                {mock.title}
              </h1>
              <img style={{ height: "100%" }} src={mock.url} alt={mock.thumbnailUrl} />
            </div>
          );
        })}
      </Slider>,
    );
  });

  test("should back title", () => {
    expect(screen.getByText(mocks[0].title)).toBeDefined();
  });

  test("button click callback", () => {
    const btnleft = screen.getByText(/</i);
    const btnRigth = screen.getByText(/>/i);

    const mock = vitest.fn();
    btnleft.onclick = mock;
    btnRigth.onclick = mock;

    fireEvent.click(btnleft);
    fireEvent.click(btnRigth);
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
