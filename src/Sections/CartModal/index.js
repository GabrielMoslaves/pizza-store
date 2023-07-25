import styles from "./styles.module.scss";
import { useOpener } from "../../hooks/useOpener";
import { useSelector } from "../../hooks/useSelector";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import EmptyState from "../../components/EmptyState";

const CartModal = () => {
  const { setOpenModal } = useOpener();
  const { selectedProducts, setSelectedProducts } = useSelector();
  const [paymentForm, setPaymentForm] = useState("");
  const [change, setChange] = useState(0);
  const [needChange, setNeedChange] = useState(false);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setOpenModal(false);
    }
  };

  const parsedSelectedProducts = selectedProducts.map((item) => {
    return { ...item, totalItemPrice: item.qtd * item.price };
  });

  const totalPrice = parsedSelectedProducts.reduce(
    (accumulator, item) => accumulator + item.totalItemPrice,
    0
  );

  const decreaseItem = (item) => {
    if (item.qtd > 1) {
      const count = (item.qtd = item.qtd - 1);
      const newArray = selectedProducts.map((i) => {
        if (i.id === item.id) {
          return { ...i, qtd: count };
        } else {
          return i;
        }
      });
      setSelectedProducts(newArray);
    } else {
      Swal.fire({
        title: "Deseja remover este item?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, remova!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedProducts((prevState) =>
            prevState.filter((i) => i.id !== item.id)
          );
          Swal.fire(
            "Removido!",
            "O item foi removido do seu carrinho.",
            "success"
          );
        }
      });
    }
  };

  const addItem = (item) => {
    const count = (item.qtd = item.qtd + 1);
    const newArray = selectedProducts.map((i) => {
      if (i.id === item.id) {
        return { ...i, qtd: count };
      } else {
        return i;
      }
    });
    setSelectedProducts(newArray);
  };

  const handleChange = (event) => {
    setPaymentForm(event.target.value);
  };

  const handleChangeObservations = (item, event) => {
    const newArray = selectedProducts.map((i) => {
      if (i.id === item.id) {
        return { ...i, observation: event.target.value };
      } else {
        return i;
      }
    });
    setSelectedProducts(newArray);
  };

  console.log({ selectedProducts });
  const handleSubmit = () => {
    if (needChange && change < totalPrice) {
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Valor do troco inferior ao total do pedido!",
      });
    } else if (!paymentForm) {
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Selecione uma forma de pagamento",
      });
    } else {
      Swal.fire({
        title: "Deseja finalizar o pedido?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Revisar pedido",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Pedido enviado!",
            "Dentro de 50 minutos o pedido será entregue.",
            "success"
          );
          setOpenModal(false);
          setSelectedProducts([]);
          console.log(selectedProducts);
        }
      });
    }
  };

  return (
    <div className={styles.background} onClick={handleOutsideClick}>
      <div className={styles.cartContainer}>
        {selectedProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <h1>Produtos Selecionados</h1>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody className={styles.row}>
                {selectedProducts?.map((item) => {
                  return (
                    <tr>
                      <td className={styles.productContainer}>
                        <div className={styles.productName}>{item.name}</div>
                        <img
                          alt="Pizza"
                          className={styles.productImage}
                          src={item.image}
                        />
                      </td>
                      <td>
                        <div className={styles.qtd}>
                          <button
                            onClick={() => decreaseItem(item)}
                            className={styles.qtdButton}
                          >
                            -
                          </button>
                          <span>{item.qtd}</span>
                          <button
                            onClick={() => addItem(item)}
                            className={styles.qtdButton}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <span className={styles.value}>
                          R$ {(item.qtd * item.price).toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <TextField
                          id="standard-multiline-flexible"
                          multiline
                          maxRows={4}
                          variant="standard"
                          placeholder="Remover cebola, trocar molho, etc..."
                          onChange={(e) => handleChangeObservations(item, e)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: "flex", width: "100%" }}>
              <div className={styles.footer}>
                <div className={styles.value}>
                  TOTAL: R$ {totalPrice.toFixed(2)}
                </div>
                <div style={{ minWidth: "200px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Forma de pagamento
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Forma de pagamento"
                      value={paymentForm}
                      onChange={handleChange}
                    >
                      <MenuItem value="Cartão de crédito">
                        Cartão de crédito
                      </MenuItem>
                      <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {paymentForm === "Dinheiro" && (
                  <div style={{ display: "flex", gap: "20px" }}>
                    <p>Precisa de troco?</p>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        checked={needChange}
                        type="radio"
                        onChange={(e) => setNeedChange(e.target.checked)}
                      />
                      <span>Sim</span>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        checked={!needChange}
                        type="radio"
                        onChange={(e) => setNeedChange(!e.target.checked)}
                      />
                      <span>Não</span>
                    </div>
                  </div>
                )}
                {needChange && paymentForm === "Dinheiro" && (
                  <TextField
                    onChange={(e) => setChange(e.target.value)}
                    placeholder="Troco para quanto?"
                    id="standard-size-small"
                    size="small"
                    variant="standard"
                  />
                )}
              </div>
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                  width: "100%",
                }}
              >
                <Button onClick={() => handleSubmit()} text="Finalizar" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
