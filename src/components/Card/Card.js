import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const Card = (props) => {
  const { name, description, price, image, product, setSelect } = props;

  return (
    <div className={styles.container}>
      <img src={image} alt="pizza" />
      <h3>{name}</h3>
      <p>{description}</p>
      <h1>R${price}</h1>
      <Button
        text="Comprar agora"
        onClick={() => {
          toast.promise(
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 500);
            }),
            {
              loading: "Adicionando ao carrinho...",
              success: <b>Adicionado!</b>,
            }
          );
          setSelect((prevState) => [...prevState, product]);
        }}
      />
    </div>
  );
};

export default Card;
