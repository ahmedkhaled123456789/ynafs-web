import { useEffect } from "react";
import { FaChevronDown, FaDownload, FaLayerGroup } from "react-icons/fa";
import { Link, useLocation /* useNavigate */ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnits,
  getSubjects,
  getLevels,
  getStages,
  getSemesters,
} from "../store/categoriesSlice";
import { useBreadCrumbV2 } from "../hooks/useBreadCrumbV2";
// import BreadcrumbV2 from "../components/BreadcrumbV2";
// import { baseURL } from "../Api/axiosRequest";

const useQuery = () => new URLSearchParams(useLocation().search);

const UnitsPage = () => {
  const query = useQuery();
  const subjectId = query.get("subjectId");

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { /* path: breadCrumbPath, */ navigateAndPushState } =
    useBreadCrumbV2();

  const { levels, units, stages, subjects, semesters, loading, error } =
    useSelector((state) => state.category);

  const handleUnitClick = async (unit) => {
    console.log(unit);
    if (unit.chapters?.length) return;
    const breadcrumb = {
      label: unit.title,
      to: `/Units${location.search || ""}`,
      id: unit._id,
    };

    navigateAndPushState(`/Lessons?parentId=${unit._id}`, breadcrumb);
  };
  // تحميل الوحدات
  useEffect(() => {
    if (subjectId) {
      const state = window.history.state;
      console.log({ state });
      dispatch(
        getUnits({ subjectId, getPath: !state?.breadcrumbPath?.length })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  // تحميل البيانات الأساسية لو مش موجودة
  useEffect(() => {
    if (subjectId) {
      const currentSubject = subjects.find((sub) => sub._id === subjectId);
      const semesterId = currentSubject?.semester;

      if (semesterId && semesters.length === 0) {
        dispatch(getSemesters());
      }

      if (subjects.length === 0) {
        dispatch(getSubjects(semesterId));
      }

      if (levels.length === 0) {
        dispatch(getLevels());
      }

      if (stages.length === 0) {
        dispatch(getStages());
      }
    }
  }, [dispatch, subjectId, subjects, semesters, levels, stages]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 ">
      {/* <BreadcrumbV2 data={breadCrumbPath} nextPageTitle="الدروس" /> */}
      <div className="flex flex-col items-center p-12">
        <h1 className="text-3xl font-bold mb-8">الوحدات الدراسية</h1>

        {loading?.units && <p className="text-gray-500">جاري التحميل...</p>}
        {error?.units && <p className="text-red-500">{error.units}</p>}

        <div className="flex flex-col gap-3 w-full max-w-6xl">
          {units.map((unit, index) => (
            <div key={unit._id || index} className="cursor-pointer">
              <div
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition gap-3"
                onClick={() => handleUnitClick(unit)}
                // className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
              >
                <div className="text-lg font-semibold !text-right w-full flex items-center justify-between flex-wrap">
                  <div>{unit.title}</div>
                  <div className="flex gap-2 items-center flex-wrap">
                    {unit.isNewThisYear && (
                      <span className="bg-emerald-500 text-white text-sm font-semibold px-5 text-center py-0.5 rounded-full">
                        جديد
                      </span>
                    )}
                    <FaChevronDown className="rotate-180" />
                  </div>
                </div>
                <div className="w-full">
                  {/* {unit.subjectBooks &&
                    unit.subjectBooks.map((book) =>
                      book.title.includes("غلاف ") ? null : (
                        <a
                          key={book.path}
                          href={
                            book?.path?.startsWith("http")
                              ? book.path
                              : (import.meta.env.DEV ? baseURL : "") + book.path
                          }
                          download={book?.title + ".pdf"}
                          className="mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                        >
                          <FaDownload />
                          <span className="text-sm">
                            {book.title.split("/")[1]?.trim() || book.title}
                          </span>
                        </a>
                      )
                    )} */}
                </div>
              </div>

              {unit.chapters?.length ? (
                unit.chapters.map((chapter) => {
                  return (
                    <div
                      key={chapter._id || index}
                      className="bg-gray-200 cursor-pointer shadow-md p-2 hover:bg-[#0093e9] hover:text-white transition text-right w-full flex items-center justify-between flex-wrap"
                      onClick={() => handleUnitClick(chapter)}
                    >
                      <div>{chapter.title}</div>
                      {chapter.isNewThisYear && (
                        <span className="bg-emerald-500 text-white text-sm font-semibold px-5 text-center py-0.5 rounded-full">
                          جديد
                        </span>
                      )}
                      {/* {chapter.subjectBooks &&
                        chapter.subjectBooks.map((book) =>
                          book.title.includes("غلاف ") ? null : (
                            <a
                              key={book.path}
                              href={
                                book?.path?.startsWith("http")
                                  ? book.path
                                  : (import.meta.env.DEV ? baseURL : "") +
                                    book.path
                              }
                              download={book?.title + ".pdf"}
                              className="mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                            >
                              <FaDownload />
                              <span className="text-sm">
                                {book.title.split("/")[1]?.trim() || book.title}
                              </span>
                            </a>
                          )
                        )} */}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitsPage;
