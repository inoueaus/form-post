import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
