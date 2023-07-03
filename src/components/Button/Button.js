import styles from "./styles.module.scss";

const Button = ({ text, ...rest }) => {
  return (
    <button className={styles.container} {...rest}>
      {text}
    </button>
  );
};

export default Button;
