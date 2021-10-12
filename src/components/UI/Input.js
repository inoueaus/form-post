import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${styles['form-control']} ${styles[props.className]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        id={props.id}
        type={props.type}
      ></input>
    </div>
  );
};

export default Input;
