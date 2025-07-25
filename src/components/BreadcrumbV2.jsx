import { Link } from "react-router-dom";

const mainCrumb = { label: "الرئيسية", _id: Date.now(), to: "/" };
const pageCrumb = { label: "", _id: Date.now() + 1 };

/**
 *
 * @param {{ data: Array<{ title: string; _id: string; }>; nextPageTitle: string; }} props
 * @returns
 */
const BreadcrumbV2 = (props) => {
  const data = props?.data?.length
    ? [
        mainCrumb,
        ...props.data,
        ...(props.nextPageTitle
          ? [{ ...pageCrumb, label: props.nextPageTitle }]
          : []),
      ]
    : [
        mainCrumb,
        ...(props.nextPageTitle
          ? [{ ...pageCrumb, label: props.nextPageTitle }]
          : []),
      ];
  return (
    <nav aria-label="breadcrumb" className="flex p-8">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600 bg-white shadow">
        {data.map((item, index) => {
          return (
            <li key={item._id || index} className="relative flex items-center">
              {index !== 0 && (
                <span
                  className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 
                  [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
                ></span>
              )}
              {!item.to ? (
                <span className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-gray-400">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  // replace
                  className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbV2;
