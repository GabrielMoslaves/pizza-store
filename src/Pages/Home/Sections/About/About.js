import React from "react";
import styles from "./styles.module.scss";
import Button from "../../../../components/Button/Button";

const About = () => {
  return (
    <div className={styles.container}>
      <img src="./restaurant.png" alt="restaurant" />
      <div className={styles.right}>
        <img src="./Sobre a La Pizza.png" alt="sobre" />
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis
          justo sem. Donec consequat, nunc a dapibus dapibus, justo dolor
          tristique tortor, sit amet tincidunt lorem nisl at ex. Cras dolor
          purus, varius in euismod pretium, finibus nec mi. Curabitur aliquam
          pharetra lectus in pharetra. Nullam viverra elementum neque quis
          fermentum.
        </p>
        <Button text="Ler mais" />
      </div>
    </div>
  );
};

export default About;
