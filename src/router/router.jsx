import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";

function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default Router;
