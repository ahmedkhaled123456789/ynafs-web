import { useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../store/categoriesSlice";
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
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-8">المواد الدراسية</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {subjects.map((subject, index) => (
          <Link
            to={`/Units?subjectId=${subject._id}`}
            key={subject._id || index}
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
          >
            <div className="mb-4"><FaBook size={70} /></div>
            <div className="text-lg font-semibold text-center">{subject.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;

