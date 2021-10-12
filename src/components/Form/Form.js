import useInput from "../../hooks/use-input";
import useFetch from "../../hooks/use-fetch";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useState } from "react";

const Form = () => {
  const [config, setConfig] = useState({
    uri: "https://react-studies-742e1-default-rtdb.firebaseio.com/form.json",
    method: "POST",
    body: null,
  });
  const fetchHandler = useFetch(config);
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

  const formValid = username.isValid && phoneNumber.isValid;

  console.log(fetchHandler.error, fetchHandler.loading, console.log(fetchHandler.data));

  const submitHandler = (e) => {
    e.preventDefault();

    setConfig((prev) => {
      return {
        ...prev,
        body: { username: username.value, phoneNumber: phoneNumber.value },
      };
    });

    username.reset();
    phoneNumber.reset();
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
          {fetchHandler.loading ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Card>
  );
};

export default Form;
