import { useEffect } from "react";
import { FaBook, FaDownload } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjects,
  getLevels,
  getSemesters,
  getStages,
} from "../store/categoriesSlice";
import { baseURL } from "../Api/axiosRequest";
import { useBreadCrumbV2 } from "../hooks/useBreadCrumbV2";
// import BreadcrumbV2 from "../components/BreadcrumbV2";

const useQuery = () => new URLSearchParams(useLocation().search);

const SubjectsPage = () => {
  const query = useQuery();
  const semesterId = query.get("semesterId");

  const dispatch = useDispatch();
  const { /* path: breadCrumbPath,  */ navigateAndPushState } =
    useBreadCrumbV2();

  const { subjects, loading, error, semesters, levels, stages } = useSelector(
    (state) => state.category
  );

  // تحميل المواد
  useEffect(() => {
    if (semesterId) {
      const state = window.history.state;
      console.log({ state });
      dispatch(
        getSubjects({ semesterId, getPath: !state?.breadcrumbPath?.length })
      );
    }
  }, [dispatch, semesterId]);

  useEffect(() => {
    if (semesterId && semesters.length === 0) {
      dispatch(getSemesters());
    }
    if (levels.length === 0) {
      dispatch(getLevels());
    }
    if (stages.length === 0) {
      dispatch(getStages());
    }
  }, [dispatch, semesterId, semesters.length, levels.length, stages.length]);

  const handleSubjectClick = async (subject) => {
    const breadcrumb = {
      label: subject.title,
      to: `/Subjects${location.search || ""}`,
      id: subject._id,
    };

    navigateAndPushState(`/Units?subjectId=${subject._id}`, breadcrumb);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      {/* <BreadcrumbV2 data={breadCrumbPath} nextPageTitle="الوحدات الدراسية" /> */}

      <div className="flex flex-col items-center p-12">
        <h1 className="text-3xl font-bold mb-8">المواد الدراسية</h1>
        <h2 className="mb-4 text-xl underline text-center text-rose-500 font-extrabold">
          لمعرفة الوحدات والاختلاف في المنهج .. اضغط على اسم المادة
        </h2>
        <p className="mb-4 text-xl text-center text-rose-500 font-extrabold">
          قد يوجد بعض الكتب طبعة 1446 - 2024 - ولكن تم اعادة توزيع المنهج وإضافة
          بعض الوحدات من الفصل الدراسي الثاني ، لذلك يرجى النظر إلى الوحدات
        </p>
        <p className="mb-4 text-xl text-center text-emerald-500 font-extrabold">
          يتم التحديث باستمرار اخر تحديث بتاريخ: 30-01-1447 هـ
        </p>

        {loading.subjects && (
          <div className="text-blue-600 font-medium animate-pulse text-lg mb-6">
            جاري التحميل...
          </div>
        )}
        {error?.subjects && (
          <p className="text-red-500 font-semibold mb-6">{error?.subjects}</p>
        )}

        {!loading.subjects && subjects.length === 0 && (
          <p className="text-gray-500">لا توجد مواد دراسية متاحة حالياً.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {subjects.map((subject, index) => (
            <div
              key={subject._id || index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center"
            >
              <div
                onClick={() => handleSubjectClick(subject)}
                className="cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 text-blue-600">
                  <FaBook size={70} />
                </div>
                <div className="text-lg font-semibold mb-4 underline">
                  {subject.title}
                </div>
              </div>

              {subject.books && subject.books.length > 0 ? (
                subject.books.map((book) =>
                  book.title.includes("غلاف ") ? null : (
                    <a
                      key={book.path}
                      href={
                        book?.path?.startsWith("http")
                          ? book.path
                          : (import.meta.env.DEV ? baseURL : "") + book.path
                      }
                      // download={book?.title + ".pdf"}
                      className="mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                      <FaDownload />
                      <span className="text-sm">
                        {book.title.split("/")[1]?.trim() || book.title}
                      </span>
                    </a>
                  )
                )
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
