import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./Routes/Routers";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter basename="/books">
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
