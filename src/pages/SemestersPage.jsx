import { useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSemesters } from "../store/categoriesSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SemestersPage = () => {
  const query = useQuery();
  const levelId = query.get("levelId");

  const dispatch = useDispatch();
  const { semesters, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (levelId) {
      dispatch(getSemesters(levelId));
    }
  }, [dispatch, levelId]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-100 flex flex-col items-center p-12"
    >
      <h1 className="text-3xl font-bold mb-8">الفصل الدراسي</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {semesters.map((semester) => (
          <Link
            to={`/Subjects?semesterId=${semester._id}`}
            key={semester._id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
          >
            <div className="mb-4">
              <FaCalendarAlt size={80} />
            </div>
            <div className="text-xl font-semibold text-center">
              {semester.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SemestersPage;
