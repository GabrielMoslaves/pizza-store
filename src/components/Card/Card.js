import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

const Card = (props) => {
  const { name, description, price, image, product, setSelected } = props;

  return (
    <div className={styles.container}>
      <img src={image} alt="pizza" />
      <h3>{name}</h3>
      <p>{description}</p>
      <h1>R${price}</h1>
      <Button
        text="Comprar agora"
        onClick={() => setSelected((prevState) => [...prevState, product])}
      />
    </div>
  );
};

export default Card;
