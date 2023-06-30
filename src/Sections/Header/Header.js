import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <img src="La Pizza.png" alt="banner" />
      </div>
    </div>
  );
};

export default Header;
