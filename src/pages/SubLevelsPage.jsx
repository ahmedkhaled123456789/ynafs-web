
import React, { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubLevels, getSemesters } from "../store/categoriesSlice";

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

     <div className="bg-[#0093e9] text-white px-6 py-6 shadow-md">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    
    {/* Title */}
    <h1 className="text-center sm:text-right text-2xl sm:text-3xl font-bold leading-relaxed">
      الكتب الدراسية - التعليم العام بالمملكة العربية السعودية لعام 1447 هـ
    </h1>

    {/* Logo */}
    <Link to="/">
      <img
      src="/images/logo1.png"
      alt="Logo"
      className="w-14 h-14 sm:w-16 sm:h-16 rounded"
    />
    </Link>
  </div>
</div>

  {/* Breadcrumb */}
  <nav aria-label="Breadcrumb" className="flex m-8">
  <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600 bg-white shadow">
    
    <li className="flex items-center">
  <button
    onClick={() => window.history.back()}
    className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900 text-blue-600 font-semibold"
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
    <span className="ms-1.5 text-xs font-medium">الصفوف الدراسية</span>
  </button>
</li>


     <li className="relative flex items-center">
      <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>
      
       <span
        className="flex h-10 items-center pe-4 ps-8 text-xs font-medium text-gray-400 cursor-default"
      >
الصفوف الفرعية       </span>
    </li>
  </ol>
</nav>

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

