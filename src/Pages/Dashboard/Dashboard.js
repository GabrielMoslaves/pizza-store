import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Box from "../../components/Box";
import styles from "./styles.module.scss";
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Content />
    </div>
  );
};

export default Dashboard;
