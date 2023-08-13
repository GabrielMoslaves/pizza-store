import styles from "./styles.module.scss";
import { useOpener } from "../../hooks/useOpener";

const ShoppingCart = () => {
  const { setOpenModal } = useOpener();
  return (
    <div
      onClick={() => setOpenModal(true)}
      className={styles.container}
    >
      <img
        alt="carrinho"
        className={styles.img}
        src="/carrinho.png"
      />
    </div>
  );
};

export default ShoppingCart;
