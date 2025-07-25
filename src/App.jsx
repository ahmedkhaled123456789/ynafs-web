import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./Routes/Routers";
import { useEffect } from "react";
import InitDataLoader from "./handlers/InitDataLoader";
import { baseURL } from "./Api/axiosRequest";

function App() {
  useEffect(() => {
    const isComingFromHomePage = localStorage.getItem("isComingFromHomePage");
    // if user not coming from main page then move them back to home page
    if (import.meta.env.PROD && !isComingFromHomePage) {
      location.href = baseURL;
    }
  }, []);

  return (
    <>
      <InitDataLoader />

      <BrowserRouter basename="/books">
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
