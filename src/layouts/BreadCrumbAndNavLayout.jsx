import { Outlet /* , useLocation */ } from "react-router-dom";
import BreadcrumbV2 from "../components/BreadcrumbV2";
import { useBreadCrumbV2 } from "../hooks/useBreadCrumbV2";
import Nav from "../components/Nav";
// import { BreadCrumbLayoutRoutes } from "../Routes/BreadCrumbLayoutRoutes";

function BreadCrumbAndNavLayout() {
  const { path: breadCrumbPath } = useBreadCrumbV2();
  // const location = useLocation();
  // const currentPath = location.pathname.replace(/^\//, ""); // remove leading slash

  // const currentIndex = BreadCrumbLayoutRoutes.findIndex(
  //   (route) => route.path === currentPath || (route.index && currentPath === "")
  // );

  // let nextRoute = BreadCrumbLayoutRoutes[currentIndex + 1];

  // if (nextRoute?.path?.includes("subLevels")) {
  //   nextRoute = {
  //     ...nextRoute,
  //     title: `${nextRoute.title} و ${
  //       BreadCrumbLayoutRoutes.find((e) => e.path?.includes("Subjects")).title ||
  //       ""
  //     }`,
  //   };
  // }

  return (
    <>
      <Nav />
      <div className="bg-gray-100">
        <BreadcrumbV2
          data={breadCrumbPath}
          // nextPageTitle={nextRoute?.title || ""}
        />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BreadCrumbAndNavLayout;
