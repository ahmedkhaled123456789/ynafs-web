import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  const breadcrumbPath = useSelector((state) => state.category.breadcrumbPath);

  return (
    <nav aria-label="breadcrumb" className="flex p-8">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600 bg-white shadow">
        {breadcrumbPath.map((item, index) => {
          const isLast = index === breadcrumbPath.length - 1;
           let title = item.title;
          if (title === "الفصل الدراسي الأول") {
            title = "المواد الدراسية";
          }

          return (
            <li key={index} className="relative flex items-center">
              {index !== 0 && (
                <span
                  className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 
                  [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
                ></span>
              )}
              {isLast ? (
                <span className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-gray-400">
                  {title}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
