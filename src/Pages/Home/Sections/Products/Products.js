import React from "react";
import Card from "../../../../components/Card/Card";
import styles from "./styles.module.scss";
import { useSelector } from "../../../../hooks/useSelector";
import { products } from "../../../../mocks/products";

const Products = () => {
  const { selectedProducts, setSelectedProducts } = useSelector();

  return (
    <div className={styles.container}>
      <h1>Mais vendidas</h1>
      <div className={styles.content}>
        {products.map((item) => (
          <Card
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
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
