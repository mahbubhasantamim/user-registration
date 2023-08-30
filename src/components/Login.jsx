import axios from "axios";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { LoginRegTemp } from "../layouts/LoginRegTemp";

import {
  Form,
  FormField,
  FormFieldError,
  FormSubmit,
} from "./modules/formComponents/formComponents";

const login = (props) => {
  const token = localStorage.getItem("user-auth");
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email: String(formData.email),
        password: String(formData.password),
      });

      if (response.data.status === "ok") {
        localStorage.setItem("user-auth", response.data.token);
      }
      navigate("/");

      // set cookies
      cookies.set("auth", response.data.token);
      console.log(response.data);
      const token = cookies.get("auth");
      console.log(jwt(token));
    } catch (error) {
      //VALIDATION
      const { email, password } = error.response.data.errors;

      if (error.response.data.errors) {
        if (email) {
          newErrors.email = email.msg;
          hasErrors = true;
        }
        if (password) {
          newErrors.password = password.msg;
          hasErrors = true;
        }
      } else {
        console.error("Error", error.message);
      }
    }

    // Update the errors state
    setErrors(newErrors);

    // Proceed with form submission or show an error message
    if (hasErrors) {
      console.log("Form has errors:", newErrors);
    } else {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <LoginRegTemp formName="Login">
      <Form onSubmit={handleSubmit}>
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

        <FormSubmit value="Submit" />
      </Form>
    </LoginRegTemp>
  );
};

export default login;
