import { render, screen } from "@testing-library/react";
import EmptyState from ".";

describe("<EmptyState/>", () => {
  it("should render emptystate correctly", () => {
    render(<EmptyState />);

    expect(screen.getByRole("heading", { name: /sem produtos no carrinho/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /carrinho-vazio/i })).toHaveAttribute(
      "src",
      "/empty-cart.png"
    );
    expect(screen.getByText(/Adicione produtos e eles aparecerão aqui/i)).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<EmptyState />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
