import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { Link } from "react-router-dom";
import { FaSchool, FaUserGraduate, FaUniversity } from "react-icons/fa";
import { getStages,getCategories } from "../store/categoriesSlice";

const StagesPage = () => {
  const dispatch = useDispatch();

  const { categories,stages, loading, error } = useSelector((state) => state.category);

   useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
 useEffect(() => {
    const catId = categories?.[0]?._id;
    if (catId) {
      dispatch(getStages(catId));
    }
  }, [dispatch, categories]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-8">المراحل</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
      {Array.isArray(stages) && stages.map((stage, index) => (
  <Link
    to={`/LevelsPage?stageId=${stage._id}`}
    key={stage._id}
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
  >
    <div className="mb-4">
      {index === 0 ? <FaSchool size={100} /> : index === 1 ? <FaUserGraduate size={100} /> : <FaUniversity size={100} />}
    </div>
<div className="text-2xl font-semibold text-center">{stage.title}</div>  </Link>
))}

      </div>
    </div>
  );
};

export default StagesPage;
