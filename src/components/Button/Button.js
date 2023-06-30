import styles from "./styles.module.scss";

const Button = ({ text }) => {
  return <button className={styles.container}>{text}</button>;
};

export default Button;
