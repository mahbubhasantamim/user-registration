import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRegTemp } from "../layouts/LoginRegTemp";
import {
  Form,
  FormField,
  FormFieldError,
  FormSubmit,
} from "./modules/formComponents/formComponents";

const Registration = (props) => {
  const token = localStorage.getItem("user-auth");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

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
  // const [passwordError, setPasswordError] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validation
    let hasErrors = false;
    const newErrors = {};

    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        name: String(formData.name),
        email: String(formData.email),
        password: String(formData.password),
        checkPassword: String(formData.checkPassword),
      });
      console.log(response.data);
    } catch (error) {
      //VALIDATION
      const { name, email, password, checkPassword } =
        error.response.data.errors;

      if (name) {
        newErrors.name = name.msg;
        hasErrors = true;
      }
      if (email) {
        newErrors.email = email.msg;
        hasErrors = true;
      }
      if (password) {
        newErrors.password = password.msg;
        hasErrors = true;
      }
      if (checkPassword) {
        newErrors.checkPassword = checkPassword.msg;
        hasErrors = true;
      }
    }
    // Update the errors state
    setErrors(newErrors);

    // Proceed with form submission or show an error message
    if (hasErrors) {
      console.log("Form has errors:", newErrors);
    } else {
      console.log("Form submitted:", formData);
      //clear form field data
      setFormData({
        name: "",
        email: "",
        password: "",
        checkPassword: "",
      });

      navigate("/signin");
    }
  };

  return (
    <LoginRegTemp formName="Registration">
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
          // errorClass={passwordError ? "error" : ""}
        >
          <FormFieldError error={errors.checkPassword} />
        </FormField>

        <FormSubmit value="Submit" />
      </Form>
    </LoginRegTemp>
  );
};

export default Registration;
