import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

const Form = () => {
  const username = useInput((value) => {
    return (
      !"!#$%&'*+-/=?^_`{|}~ \"(),:;<>@[]\\".split("").some((char) => value.includes(char)) &&
      value.length > 0
    );
  });

  const formValid = username.isValid;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(username.value, username.isValid, username.touched);
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <Input
          id="username"
          type="username"
          className={!username.isValid && username.touched && "invalid"}
          onChange={username.inputHandler}
          onBlur={username.blurHandler}
          value={username.value}
        >
          Username
        </Input>
        <Button disabled={!formValid} type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default Form;
