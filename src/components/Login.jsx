import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginRegTemp } from "../layouts/LoginRegTemp";
import {
  Form,
  FormField,
  FormSubmit,
} from "./modules/formComponents/formComponents";

const login = (props) => {
  return (
    <LoginRegTemp formName="Login">
      <div className=" float-right m-4 text-2xl hover:cursor-pointer">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={props.handleLog}
          className=" py-2 px-[10px] rounded-full hover:bg-gray-100 transition duration-500 ease-in-out"
        />
      </div>
      <Form>
        <FormField type="email" placeholder="Email" />
        <FormField type="password" placeholder="Password" />

        <FormSubmit value="Submit" />
      </Form>
    </LoginRegTemp>
  );
};

export default login;
