import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUnits } from "../store/categoriesSlice";
 const useQuery = () => new URLSearchParams(useLocation().search);
const UnitsPage = () => {
  const query = useQuery();
  const subjectId = query.get("subjectId");

  const dispatch = useDispatch();
  const { units, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (subjectId) {
      dispatch(getUnits(subjectId));
    }
  }, [dispatch, subjectId]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-8">الوحدات الدراسية</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {units.map((unit, index) => (
          <Link
          to={`/Lessons?unitId=${unit._id}`}
            key={unit._id || index}
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
          >
            <div className="mb-4"><FaLayerGroup size={70} /></div>
            <div className="text-lg font-semibold text-center">{unit.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UnitsPage;
