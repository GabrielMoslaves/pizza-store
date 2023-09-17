import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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

    expect.assertions(4);

    const addProductButtons = screen.getAllByRole("button", {
      name: /comprar agora/i,
    });

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

    expect.assertions(4);

    const addProductButtons = screen.getAllByRole("button", {
      name: /comprar agora/i,
    });

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

    expect.assertions(2);

    const addProductButtons = screen.getAllByRole("button", {
      name: /comprar agora/i,
    });

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
  });

  it("it should finish buy with credicard as payment form", async () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    expect.assertions(4);

    const user = userEvent.setup();

    const addProductButtons = screen.getAllByRole("button", {
      name: /comprar agora/i,
    });

    await act(async () => {
      await user.click(addProductButtons[1]);
    });

    const shoppingCart = screen.getByRole("img", { name: /carrinho/i });

    await act(async () => {
      await user.click(shoppingCart);
    });

    const paymentFormSelector = screen.getByRole("button", {
      name: /forma de pagamento ​/i,
    });

    expect(paymentFormSelector).toBeInTheDocument();

    await act(async () => {
      await user.click(paymentFormSelector);
    });

    await act(async () => {
      await user.click(screen.getByRole("option", { name: /cartão de crédito/i }));
    });

    screen.debug();

    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /finalizar/i,
        })
      );
    });

    expect(
      screen.getByRole("heading", {
        name: /deseja finalizar o pedido\?/i,
      })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /sim!/i,
        })
      );
    });

    expect(
      screen.getByRole("heading", {
        name: /pedido enviado!/i,
      })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /ok/i,
        })
      );
    });

    expect(
      screen.getByRole("heading", {
        name: /guia de produção/i,
      })
    ).toBeInTheDocument();
  });

  it("should finish buy with money payment form", async () => {
    render(
      <SelectorContextProvider>
        <OpenModalContextProvider>
          <Home />
        </OpenModalContextProvider>
      </SelectorContextProvider>
    );

    expect.assertions(3);

    const user = userEvent.setup();

    const addProductButtons = screen.getAllByRole("button", {
      name: /comprar agora/i,
    });

    await act(async () => {
      await user.click(addProductButtons[1]);
    });

    const shoppingCart = screen.getByRole("img", { name: /carrinho/i });

    await act(async () => {
      await user.click(shoppingCart);
    });

    const paymentFormSelector = screen.getByRole("button", {
      name: /forma de pagamento ​/i,
    });

    expect(paymentFormSelector).toBeInTheDocument();

    await act(async () => {
      await user.click(paymentFormSelector);
    });

    await act(async () => {
      await user.click(screen.getByRole("option", { name: /dinheiro/i }));
    });

    await act(async () => {
      await user.click(screen.getByTestId("confirmChange"));
    });

    expect(screen.getByRole("spinbutton")).toBeInTheDocument();

    await act(async () => {
      await user.type(screen.getByRole("spinbutton"), "50");
    });

    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /finalizar/i,
        })
      );
    });

    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /sim!/i,
        })
      );
    });

    await act(async () => {
      await user.click(
        screen.getByRole("button", {
          name: /ok/i,
        })
      );
    });

    expect(screen.getByText(/r\$26\.01/i)).toBeInTheDocument();
  });
});
