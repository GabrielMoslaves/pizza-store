import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { OpenModalContextProvider } from "../../context/openModal";
import { SelectorContextProvider } from "../../context/selector";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("<Home/>", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  afterEach(() => {
    cleanup();
  });

  it("should render shoppingCart", () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    expect(screen.getByRole("img", { name: /carrinho/i })).toBeInTheDocument();
  });

  it("should open empty cart modal when click on shoppingCart", () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    const shoppingCart = screen.getByRole("img", { name: /carrinho/i });

    expect(shoppingCart).toBeInTheDocument();

    fireEvent.click(shoppingCart);

    expect(screen.getByRole("heading", { name: /sem produtos no carrinho/i })).toBeInTheDocument();
  });

  it("should render product cards", () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    expect(screen.getAllByRole("img", { name: /la/i }).length).toBe(4);
  });

  it("should add one product on shoppingCart", async () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    const addProductButtons = screen.getAllByRole("button", { name: /comprar agora/i });

    await act(async () => {
      fireEvent.click(addProductButtons[0]);
    });

    expect(screen.getByText("Adicionando ao carrinho...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Adicionado!")).toBeInTheDocument();
    });

    const shoppingCart = screen.getByRole("img", { name: /carrinho/i });

    fireEvent.click(shoppingCart);

    expect(screen.getByRole("cell", { name: "- 1 +" })).toBeInTheDocument();
    expect(screen.getByText("TOTAL: R$ 23.99")).toBeInTheDocument();
  });

  it("it should increase items", async () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    const addProductButtons = screen.getAllByRole("button", { name: /comprar agora/i });

    await act(async () => {
      fireEvent.click(addProductButtons[0]);
    });

    expect(screen.getByText("Adicionando ao carrinho...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Adicionado!")).toBeInTheDocument();
    });

    const shoppingCart = screen.getByRole("img", { name: /carrinho/i });

    fireEvent.click(shoppingCart);

    fireEvent.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByRole("cell", { name: "- 2 +" })).toBeInTheDocument();
    expect(screen.getByText("TOTAL: R$ 47.98")).toBeInTheDocument();
  });

  it("it should decrease items", async () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    const addProductButtons = screen.getAllByRole("button", { name: /comprar agora/i });

    fireEvent.click(addProductButtons[1]);

    const shoppingCart = screen.getByRole("img", { name: /carrinho/i });

    fireEvent.click(shoppingCart);

    fireEvent.click(screen.getByRole("button", { name: "-" }));

    const removeButton = screen.getByRole("button", { name: "Sim, remova!" });
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "OK" }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /sem produtos no carrinho/i,
        })
      ).toBeInTheDocument();
    });

    screen.debug();
  });
});
