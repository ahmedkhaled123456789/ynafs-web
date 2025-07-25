import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./Routes/Routers";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { setBreadcrumbPath } from "./store/categoriesSlice";
import { useDispatch } from "react-redux";
import InitDataLoader from "./handlers/InitDataLoader";
import { baseURL } from "./Api/axiosRequest";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedPath = localStorage.getItem("breadcrumbPath");
    const isComingFromHomePage = localStorage.getItem("isComingFromHomePage");

    if (savedPath) {
      dispatch(setBreadcrumbPath(JSON.parse(savedPath)));
    }

    // if user not coming from main page then move them back to home page
    if (import.meta.env.PROD && !isComingFromHomePage) {
      location.href = `${baseURL}/#stages`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InitDataLoader />

      <Nav />
      <BrowserRouter basename="/books">
        <Routers />
      </BrowserRouter>
    </>
  );
}

export default App;
