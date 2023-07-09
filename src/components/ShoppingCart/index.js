import styles from "./styles.module.scss";
import { useOpener } from "../../hooks/useOpener";
const ShoppingCart = () => {
  const { setOpenModal } = useOpener();

  return (
    <div onClick={() => setOpenModal(true)} className={styles.container}>
      <img alt="carrinho" style={{ maxWidth: 80 }} src="/carrinho.png" />
    </div>
  );
};

export default ShoppingCart;
