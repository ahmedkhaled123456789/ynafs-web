import { Outlet, useLocation } from "react-router-dom";
import BreadcrumbV2 from "../components/BreadcrumbV2";
import { useBreadCrumbV2 } from "../hooks/useBreadCrumbV2";
import Nav from "../components/Nav";
import { BreadCrumbLayoutRoutes } from "../Routes/BreadCrumbLayoutRoutes";

function BreadCrumbAndNavLayout() {
  const { path: breadCrumbPath } = useBreadCrumbV2();
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\//, ""); // remove leading slash

  const currentRoute = BreadCrumbLayoutRoutes.find(
    (route) => route.path === currentPath || (route.index && currentPath === "")
  );

  return (
    <>
      <Nav />
      <div className="bg-gray-100">
        <BreadcrumbV2
          data={breadCrumbPath}
          nextPageTitle={currentRoute?.nextPageTitle || ""}
        />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BreadCrumbAndNavLayout;
