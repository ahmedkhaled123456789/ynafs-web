import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./Routes/Routers";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { setBreadcrumbPath } from "./store/categoriesSlice";
import { useDispatch } from "react-redux";
import InitDataLoader from "./handlers/InitDataLoader";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedPath = localStorage.getItem("breadcrumbPath");
    if (savedPath) {
      dispatch(setBreadcrumbPath(JSON.parse(savedPath)));
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
