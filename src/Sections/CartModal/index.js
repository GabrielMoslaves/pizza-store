import styles from "./styles.module.scss";
import { useOpener } from "../../hooks/useOpener";
import { useSelector } from "../../hooks/useSelector";
import Button from "../../components/Button/Button";

const CartModal = () => {
  const { setOpenModal } = useOpener();
  const { selectedProducts } = useSelector();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setOpenModal(false);
    }
  };

  const totalPrice = selectedProducts.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );    

  return (
    <div className={styles.container} onClick={handleOutsideClick}>
      <div className={styles.content}>
        <h1>Produtos Selecionados</h1>

        <table>
          <tr>
            <td>Produto</td>
            <td>Quantidade</td>
            <td>Valor</td>
            <td>Observações</td>
          </tr>
          {selectedProducts.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <span>{item.name}</span>
                  <img alt="product" src={item.image} />
                </td>
                <td>{item.qtd}</td>
                <td>{item.price}</td>
                <input type="text" />
              </tr>
            );
          })}
        </table>
        <p>total: {totalPrice}</p>
        <Button text="Finalizar" />
      </div>
    </div>
  );
};

export default CartModal;
