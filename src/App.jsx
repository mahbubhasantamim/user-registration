import { BrowserRouter } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import "./tailwind.css";

function App() {
  return (
    <BrowserRouter>
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;
