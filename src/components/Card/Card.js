import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

const Card = () => {
  return (
    <div className={styles.container}>
      <img src="/image 16.png" alt="pizza" />
      <h3>La cuma</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <h1>R$23</h1>
      <Button text="Comprar agora" />
    </div>
  );
};

export default Card;
