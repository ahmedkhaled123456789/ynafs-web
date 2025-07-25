import { Routes, Route } from "react-router-dom";
import BreadCrumbAndNavLayout from "../layouts/BreadCrumbAndNavLayout";
import { BreadCrumbLayoutRoutes } from "./BreadCrumbLayoutRoutes";

const Routers = () => {
  // const { path: breadCrumbPath } = useBreadCrumbV2();
  //
  return (
    <Routes>
      <Route path="/" element={<BreadCrumbAndNavLayout />}>
        {
          // eslint-disable-next-line no-unused-vars
          BreadCrumbLayoutRoutes.map(({ path, Element, title, index }, i) => (
            <Route
              key={path || title || i}
              index={index}
              path={path}
              element={<Element />}
            />
          ))
        }
      </Route>
    </Routes>
  );
};

export default Routers;
