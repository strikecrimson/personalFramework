import React from "react";
import { createRoot } from "react-dom/client";
import styles from "./index.module.less";

const App = () => {
  return <div className={styles.main}>initialPages</div>;
};

const rootNode = document.getElementById("root");

if (rootNode) {
  const root = createRoot(rootNode);
  root.render(<App />);
}
