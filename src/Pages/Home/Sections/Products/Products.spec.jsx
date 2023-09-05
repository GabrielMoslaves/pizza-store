import { render, screen } from "@testing-library/react";
import Products from "./Products";
import { SelectorContextProvider } from "../../../../context/selector";

describe("<Products/>", () => {
  it("should render all products", () => {
    render(
      <SelectorContextProvider>
        <Products />
      </SelectorContextProvider>
    );

    const buttons = screen.getAllByRole("button", { name: /comprar agora/i });
    const images = screen.getAllByRole("img", { name: /la/i });

    expect(buttons.length).toBe(4);
    expect(images.length).toBe(4);
    expect(screen.getByRole("img", { name: /la bana/i })).toHaveAttribute("src", "./pizza3.png");
  });

  it("should match snapshot", () => {
    const { container } = render(
      <SelectorContextProvider>
        <Products />
      </SelectorContextProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
