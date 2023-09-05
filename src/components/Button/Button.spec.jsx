import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("<Button/>", () => {
  it("should render button with selected text", () => {
    const fn = jest.fn();
    render(
      <Button
        text="Comprar agora"
        onClick={fn}
      />
    );

    const button = screen.getByRole("button", { name: /comprar agora/i });
    expect(button).toBeInTheDocument();
  });

  it("should call onClick function when press button", () => {
    const fn = jest.fn();

    render(
      <Button
        text="Comprar mais"
        onClick={fn}
      />
    );

    const button = screen.getByRole("button", { name: /comprar mais/i });
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();

    const { container } = render(
      <Button
        onClick={fn}
        text="Comprar mais"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
