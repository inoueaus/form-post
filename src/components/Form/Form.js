import useInput from "../../hooks/use-input";
import useFetch from "../../hooks/use-fetch";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { useState } from "react";

const Form = () => {
  const [showModal, setShowModal] = useState(false);
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

  const toggleModal = () => {
    setShowModal(prev => {return !prev});
  }

  const submitHandler = (e) => {
    e.preventDefault();

    setConfig((prev) => {
      return {
        ...prev,
        body: { username: username.value, phoneNumber: phoneNumber.value },
      };
    });
    setShowModal(true);
    username.reset();
    phoneNumber.reset();
  };
  return (
    <Card>
      {showModal && (
        <Modal>
          <h3>Successfully submitted form!</h3>
          <p style={{"margin-bottom": "3rem"}}>{fetchHandler.data ? fetchHandler.data.name : "Loading..."}</p>
          <Button onClick={toggleModal}>Close</Button>
        </Modal>
      )}
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
