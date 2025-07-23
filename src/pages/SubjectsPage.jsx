import { useEffect } from "react";
import { FaBook, FaDownload } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../store/categoriesSlice";
import { baseURL } from "../Api/baseURL";
import Breadcrumb from "../components/Breadcrumb";
const useQuery = () => new URLSearchParams(useLocation().search);

const SubjectsPage = () => {
  const query = useQuery();
  const semesterId = query.get("semesterId");

  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (semesterId) {
      dispatch(getSubjects(semesterId));
    }
  }, [dispatch, semesterId]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-100 "
    >

  {/* Breadcrumb */}
  <Breadcrumb />

<div className="flex flex-col items-center p-12">
   <h1 className="text-3xl font-bold mb-8">المواد الدراسية</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {subjects.map((subject, index) => (
          <div
            key={subject._id || index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center "
          >
            <div className="mb-4">
              <FaBook size={70} />
            </div>
            <div className="text-lg font-semibold text-center mb-4">
              {subject.title}
            </div>
            {subject.books && subject.books.length > 0 ? (
              subject.books.map((e) => {
                return e.title.includes("غلاف ") ? null : (
                  <a
                    key={e.path}
                    href={
                      !e?.path?.startsWith("http")
                        ? (import.meta.env.DEV ? baseURL : "") + e?.path
                        : e?.path
                    }
                    download={e?.title + ".pdf"}
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    <FaDownload />
                    <span className="text-center">
                      {e.title.split("/")[1]?.trim() || e.title}
                    </span>
                  </a>
                );
              })
            ) : (
              <p className="mt-4 text-red-600 font-medium">
                الكتاب غير متاح الآن
              </p>
            )}
          </div>
        ))}
      </div>
</div>
     
    </div>
  );
};

export default SubjectsPage;
