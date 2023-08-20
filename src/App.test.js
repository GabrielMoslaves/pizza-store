import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import CartModal from "./Pages/Home/Sections/CartModal";
import Providers from "./providers";

describe("App component", () => {
  it("should render buttons", () => {
    render(<App />);
    const linkElement = screen.getByText(/Mais vendidas/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render cartIcon", () => {
    render(<App />);
    const cartIcon = screen.getByRole("img", { name: /carrinho/i });
    expect(cartIcon).toBeInTheDocument();
  });

  it("should open CartModal", () => {
    render(<App />);
    const button = screen.getByRole("img", { name: /carrinho/i });
    fireEvent.click(button);
    const modal = screen.getByTestId("cart-modal-overlay");
    expect(modal).toBeInTheDocument();
  });

  it("should close cartModal", () => {
    render(
      <Providers>
        <CartModal />
      </Providers>
    );
    const modalContent = screen.getByTestId("cart-modal-content");

    expect(modalContent).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(modalContent).not.toBeInTheDocument();
  });
});
