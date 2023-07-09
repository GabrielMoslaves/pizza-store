import React from "react";
import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const Card = (props) => {
  const {
    name,
    description,
    price,
    image,
    product,
    setSelectedProducts,
    selectedProducts,
  } = props;

  const selectedIds = selectedProducts?.map((item) => item.id);

  const handleAddProduct = () => {
    if (selectedIds?.includes(product.id)) {
      setSelectedProducts((prevState) => {
        const updatedList = prevState.map((item) => {
          if (item.id === product.id) {
            return { ...item, qtd: item.qtd + 1 };
          } else {
            return item;
          }
        });
        return updatedList;
      });
    } else {
      setSelectedProducts((prevState) => [...prevState, product]);
    }
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
  };
  return (
    <div className={styles.container}>
      <img src={image} alt="pizza" />
      <h3>{name}</h3>
      <p>{description}</p>
      <h1>R${price}</h1>
      <Button
        text="Comprar agora"
        onClick={() => {
          handleAddProduct();
        }}
      />
    </div>
  );
};

export default Card;
