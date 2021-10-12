import React, { useState } from "react";

import useInput from "../../hooks/use-input";
import useFetch from "../../hooks/use-fetch";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

const nameValidator = (value) => {
  return (
    !"!#$%&'*+-/=?^_`{|}~ \"(),:;<>@[]\\"
      .split("")
      .some((char) => value.includes(char)) && value.length > 0
  );
};

const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState({
    uri: "https://react-studies-742e1-default-rtdb.firebaseio.com/form.json",
    method: "POST",
    body: null,
  });
  const fetchHandler = useFetch(config);
  const firstName = useInput(nameValidator);
  const lastName = useInput(nameValidator);
  const phoneNumber = useInput((value) => {
    return /^\d{1,}-\d{1,4}-\d{4}$/.test(value);
  });
  const email = useInput((value) => {
    return (
      !"!#$%&'*+-/=?^_`{|}~ \"(),:;<>[]\\"
        .split("")
        .some((char) => value.includes(char)) &&
      value.length > 0 &&
      ["@", "."].every((char) => value.includes(char))
    );
  });

  const formValid = firstName.isValid && phoneNumber.isValid;

  const toggleModal = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setConfig((prev) => {
      return {
        ...prev,
        body: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
        },
      };
    });
    setShowModal(true);
    firstName.reset();
    lastName.reset();
    email.reset();
    phoneNumber.reset();
  };
  return (
    <>
      {showModal && (
        <Modal onClick={toggleModal}>
          <h3>Successfully submitted form!</h3>
          <p style={{ marginBottom: "3rem" }}>
            Status:{" "}
            {fetchHandler.data
              ? "Form sent! " + fetchHandler.data.name
              : "Sending..."}
          </p>
          <Button onClick={toggleModal}>Close</Button>
        </Modal>
      )}
      <Card>
        <form onSubmit={submitHandler}>
          <Input
            id="firstName"
            type="firstName"
            className={!firstName.isValid && firstName.touched && "invalid"}
            onChange={firstName.inputHandler}
            onBlur={firstName.blurHandler}
            value={firstName.value}
            label="First name"
            placeholder="John"
          />
          <Input
            id="lastName"
            type="lastName"
            className={!lastName.isValid && lastName.touched && "invalid"}
            onChange={lastName.inputHandler}
            onBlur={lastName.blurHandler}
            value={lastName.value}
            label="Last name"
            placeholder="Smith"
          />
          <Input
            id="email"
            type="email"
            className={!email.isValid && email.touched && "invalid"}
            onChange={email.inputHandler}
            onBlur={email.blurHandler}
            value={email.value}
            label="Email"
            description={
              !email.isValid &&
              email.touched &&
              email.value.length > 0 &&
              "Email must be of a valid format"
            }
            placeholder="smith@mail.com"
          />
          <Input
            id="phoneNumber"
            type="phonenumber"
            className={!phoneNumber.isValid && phoneNumber.touched && "invalid"}
            onChange={phoneNumber.inputHandler}
            onBlur={phoneNumber.blurHandler}
            value={phoneNumber.value}
            label="Phone number"
            placeholder="080-0808-8080"
            description={!phoneNumber.isValid && phoneNumber.touched && phoneNumber.value.length > 0 && "Please use hyphens"}
          />
          <Button
            style={{ marginTop: "1rem" }}
            disabled={!formValid}
            type="submit"
          >
            {fetchHandler.loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Form;
