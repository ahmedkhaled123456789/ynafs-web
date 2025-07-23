
import React, { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubLevels, getSemesters } from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SubLevelsPage = () => {
  const query = useQuery();
  const levelId = query.get("levelId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subLevels, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (levelId) {
      dispatch(getSubLevels(levelId));
    }
  }, [dispatch, levelId]);

 const handleLevelClick = async (subLevelId) => {
  const resultAction = await dispatch(getSemesters(subLevelId));

  const data = resultAction.payload;
  if (Array.isArray(data) && data.length === 1) {
    navigate(`/Subjects?semesterId=${data[0]._id}`);
  } else if (Array.isArray(data) && data.length > 1) {
     navigate(`/Semesters?subLevelId=${subLevelId}`);
  }
};


  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 ">
  {/* Breadcrumb */}
    <Breadcrumb />

<div className="flex flex-col items-center p-12">
 <h1 className="text-3xl font-bold mb-8">الصفوف الفرعية  </h1>

      {loading && <p>جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {subLevels.map((level) => (
          <div
            key={level._id}
            onClick={() => handleLevelClick(level._id)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
          >
            <div className="mb-4"><FaBookOpen size={80} /></div>
            <div className="text-xl font-semibold text-center">{level.title}</div>
          </div>
        ))}
      </div>
</div>
     
    </div>
  );
};

export default SubLevelsPage;

