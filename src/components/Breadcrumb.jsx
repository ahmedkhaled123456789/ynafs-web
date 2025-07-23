import { Link, useLocation } from "react-router-dom";

// خريطة الباثات لترجمتها لعناوين مفهومة
const breadcrumbMap = {
  "books": "المراحل الدراسية",    // غيّر على حسب هيكل الروابط عندك
  "LevelsPage": "الصفوف الدراسية",
  "StagesPage": "المراحل الدراسية",
  "subLevels": "صفوف فرعية",
  "Subjects": "المواد",
  "": "الرئيسية",
};

const Breadcrumb = () => {
  const location = useLocation();

  // امسك كل أجزاء الرابط بعد /
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="flex p-8">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600 bg-white shadow">
        {/* الرئيسية */}
        <li className="flex items-center">
          <Link
            to="/"
            className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 text-blue-600 font-semibold hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="ms-1.5 text-xs font-medium">الرئيسية</span>
          </Link>
        </li>

        {/* باقي المسارات */}
        {pathnames.map((segment, index) => {
          const path = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          // استخدم الترجمة من الخريطة أو طبع الأصل
          const label = breadcrumbMap[segment] || decodeURIComponent(segment);

          return (
            <li key={index} className="relative flex items-center">
              <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 
                [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

              {isLast ? (
                <span className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-gray-400">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                  {label}
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
