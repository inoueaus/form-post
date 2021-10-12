import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-inner"]}>{props.children}</div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
