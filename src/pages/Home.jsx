import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";

const Home = () => {
  const [logShowModal, setLogShowModal] = useState(false);
  const [regShowModal, setRegShowModal] = useState(false);

  const handleLog = () => {
    setLogShowModal(!logShowModal);
  };

  const handleReg = () => {
    setRegShowModal(!regShowModal);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className=" text-center">
          <p className=" text-3xl font-medium mb-5">Chat Application</p>

          <FontAwesomeIcon
            icon={faMessage}
            className=" text-center text-8xl mb-8"
          />
        </div>
        <div>
          <button
            className="bg-secondary-color hover:bg-black m-1 px-6 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:text-white transition duration-300 ease-in delay-75"
            onClick={handleLog}
          >
            Singin
          </button>
          <button
            className="bg-primary-color hover:bg-black m-1 px-6 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:text-white duration-300 ease-in delay-75"
            onClick={handleReg}
          >
            Signup
          </button>
        </div>
      </div>
      {logShowModal ? <Login handleLog={handleLog} /> : null}
      {regShowModal ? <Registration handleReg={handleReg} /> : null}
    </>
  );
};

export default Home;
