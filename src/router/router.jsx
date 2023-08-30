import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Error from "../pages/Error";
import Home from "../pages/Home";

function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </>
  );
}

export default Router;
