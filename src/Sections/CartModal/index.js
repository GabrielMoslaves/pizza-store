import styles from "./styles.module.scss";
import { useOpener } from "../../hooks/useOpener";
import { useSelector } from "../../hooks/useSelector";
import Button from "../../components/Button/Button";

const CartModal = () => {
  const { setOpenModal } = useOpener();
  const { select } = useSelector();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setOpenModal(false);
    }
  };

  const totalPrice = select.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

  const contagem = select.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = 1;
    } else {
      acc[item.name] += 1;
    }
    return acc;
  }, {});

  console.log({ select });

  const singleListfunction = () => {
    const singleList = [];
    const registeredNames = [];

    select.forEach((item) => {
      if (!registeredNames.includes(item.name)) {
        registeredNames.push(item.name);
        singleList.push(item);
      }
    });

    return singleList;
  };

  const singleList = singleListfunction();

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
          {singleList.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <span>{item.name}</span>
                  <img alt="product" src={item.image} />
                </td>
                <td>{contagem[item.name]}</td>
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
