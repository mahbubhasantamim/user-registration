import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("user-auth");

  const handleLog = () => {
    navigate("/signin");
  };

  const handleReg = () => {
    navigate("/signup");
  };

  return (
    <>
      {token ? (
        <Chat />
      ) : (
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
              Signin
            </button>
            <button
              className="bg-primary-color hover:bg-black m-1 px-6 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:text-white duration-300 ease-in delay-75"
              onClick={handleReg}
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
