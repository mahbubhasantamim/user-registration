import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { LoginRegTemp } from "../layouts/LoginRegTemp";
import {
  Form,
  FormField,
  FormFieldError,
  FormSubmit,
} from "./modules/formComponents/formComponents";

const Registration = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: [value],
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //validation
    let hasErrors = false;
    const newErrors = {};

    if (String(formData.name).trim() === "") {
      newErrors.name = "Name is required";
      hasErrors = true;
    } else {
      newErrors.name = "";
    }

    if (String(formData.email).trim() === "") {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else {
      newErrors.email = "";
    }

    if (String(formData.password).trim() === "") {
      newErrors.password = "Password is required";
      hasErrors = true;
    } else {
      newErrors.password = "";
    }

    if (String(formData.checkPassword).trim() === "") {
      newErrors.checkPassword = "Password is required";
      hasErrors = true;
    } else {
      newErrors.checkPassword = "";
      formData.password[0] !== formData.checkPassword[0]
        ? setPasswordError(true)
        : setPasswordError(false);
    }

    // Update the errors state
    setErrors(newErrors);

    // Proceed with form submission or show an error message
    if (hasErrors) {
      console.log("Form has errors:", newErrors);
    } else {
      console.log("Form submitted:", formData);
      // ... Additional logic here
    }

    console.log(formData);
  };

  return (
    <LoginRegTemp formName="Registration">
      <div className=" float-right m-4 text-2xl hover:cursor-pointer">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={props.handleReg}
          className=" py-2 px-[10px] rounded-full hover:bg-gray-100 transition duration-500 ease-in-out"
        />
      </div>
      <Form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        >
          <FormFieldError error={errors.name} />
        </FormField>
        <FormField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        >
          <FormFieldError error={errors.email} />
        </FormField>
        <FormField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
        >
          <FormFieldError error={errors.password} />
        </FormField>
        <FormField
          type="password"
          name="checkPassword"
          value={formData.checkPassword}
          onChange={handleInputChange}
          placeholder="Re-type password"
          errorClass={passwordError ? "error" : ""}
        >
          <FormFieldError error={errors.checkPassword} />

          {passwordError ? (
            <FormFieldError error="Password don't match" />
          ) : null}
        </FormField>

        <FormSubmit value="Submit" />
      </Form>
    </LoginRegTemp>
  );
};

export default Registration;
