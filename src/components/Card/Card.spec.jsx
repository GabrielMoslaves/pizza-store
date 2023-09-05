import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

describe("<Card/>", () => {
  const mockCardProps = {
    name: "Pizza",
    description: "lorem ipsum dolor",
    price: 30,
    image: "./pizza1.png",
  };

  it("should render card correctly", () => {
    render(<Card {...mockCardProps} />);

    expect(screen.getByRole("img", { name: /pizza/i })).toHaveAttribute("src", "./pizza1.png");
    expect(screen.getByRole("heading", { name: /pizza/i })).toBeInTheDocument();
    expect(screen.getByText(/lorem ipsum dolor/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /30/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /comprar agora/i })).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<Card {...mockCardProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
