import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

const Form = () => {
  const username = useInput((value) => {
    return (
      !"!#$%&'*+-/=?^_`{|}~ \"(),:;<>@[]\\"
        .split("")
        .some((char) => value.includes(char)) && value.length > 0
    );
  });
  const phoneNumber = useInput((value) => {
    return /^\d{1,}-\d{1,4}-\d{4}$/.test(value);
  });

  const formValid = username.isValid;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(username.value, username.isValid, username.touched);
    console.log(phoneNumber.value,phoneNumber.isValid)
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
        <Input
          id="phoneNumber"
          type="phonenumber"
          className={!phoneNumber.isValid && phoneNumber.touched && "invalid"}
          onChange={phoneNumber.inputHandler}
          onBlur={phoneNumber.blurHandler}
          value={phoneNumber.value}
        >
          Phone Number
        </Input>
        <Button disabled={!formValid} type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default Form;
