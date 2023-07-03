import React, { useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./styles.module.scss";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "La Cuma",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 23,
      image: "./pizza1.png",
    },
    {
      id: 2,
      name: "La Menta",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 23,
      image: "./pizza2.png",
    },
    {
      id: 3,
      name: "La Bana",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 23,
      image: "./pizza3.png",
    },
    {
      id: 4,
      name: "La Toca",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 23,
      image: "./pizza4.png",
    },
  ];

  const [selected, setSelected] = useState([]);
  console.log({ selected });
  return (
    <div className={styles.container}>
      <h1>Mais vendidas</h1>
      <div className={styles.content}>
        {products.map((item) => (
          <Card
            setSelected={setSelected}
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
