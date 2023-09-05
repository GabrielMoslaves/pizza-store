import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("should render buttons", () => {
    render(<App />);
    const linkElement = screen.getAllByText(/comprar agora/i);
    expect(linkElement.length).toBe(4);
  });
});
