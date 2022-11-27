import { KanbanCard } from "../index";
import { render, screen } from "@testing-library/react";

const cardText = "Hello";

describe("KanbanCard tests", () => {
  beforeEach(() => {
    render(
      <KanbanCard>
        {cardText}
        <p>world</p>
      </KanbanCard>,
    );
  });

  test("should back text", () => {
    expect(screen.getByText(cardText)).toBeDefined();
  });

  test("should back element", () => {
    expect(screen.queryByText(/world/i)).toBeDefined();
  });
});
