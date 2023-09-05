import { render, screen } from "@testing-library/react";
import ShoppingCart from ".";
import { OpenModalContextProvider } from "../../context/openModal";

describe("<ShoppingCart/>", () => {
  it("should render correctly", () => {
    render(
      <OpenModalContextProvider>
        <ShoppingCart />
      </OpenModalContextProvider>
    );

    expect(screen.getByRole("img", { name: /carrinho/i })).toHaveAttribute("src", "/carrinho.png");
  });

  it("should match snapshot", () => {
    const { container } = render(
      <OpenModalContextProvider>
        <ShoppingCart />
      </OpenModalContextProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
