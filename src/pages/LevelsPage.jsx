
import React, { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLevels, getSemesters } from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LevelsPage = () => {
  const query = useQuery();
  const stageId = query.get("stageId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { levels, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (stageId) {
      dispatch(getLevels(stageId));
    }
  }, [dispatch, stageId]);

 const handleLevelClick = async (level) => {
  if (level.subLevels && level.subLevels.length > 0) {
    navigate(`/subLevels?levelId=${level._id}`);
  } else {
    const resultAction = await dispatch(getSemesters(level._id));
    const data = resultAction.payload;
    if (Array.isArray(data) && data.length === 1) {
      navigate(`/Subjects?semesterId=${data[0]._id}`);
    }
  }
};


  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 ">

  {/* Breadcrumb */}
 <Breadcrumb
      items={[
        { label: "الرئيسية", path: "/" },
        { label: "المراحل الدراسية", path: "/books/StagesPage" },
        { label: "الصفوف الدراسية" },
      ]}
    />
    <div className="flex flex-col items-center p-12">
  <h1 className="text-3xl font-bold mb-8">الصفوف الدراسية</h1>

      {loading && <p>جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {levels.map((level) => (
          <div
            key={level._id}
            onClick={() => handleLevelClick(level)}
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

export default LevelsPage;




// import React, { useEffect } from "react";
// import { FaBookOpen } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getLevels } from "../store/categoriesSlice";
 


//  const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };
//   const LevelsPage = () => {
    
//   const query = useQuery();
//   const stageId = query.get("stageId");

//   const dispatch = useDispatch();
//   const { levels, loading, error } = useSelector((state) => state.category);

//   useEffect(() => {
//     if (stageId) {
//       dispatch(getLevels(stageId));
//     }
//   }, [dispatch, stageId]);
//    return (
//     <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center p-12">
//       <h1 className="text-3xl font-bold mb-8">الصفوف الدراسية</h1>

//       {loading && <p>جاري التحميل...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
//         {levels.map((level) => (
//           <Link
//             to={`/Semesters?levelId=${level._id}`}
//             key={level._id}
//             className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
//           >
//             <div className="mb-4"><FaBookOpen size={80} /></div>
//             <div className="text-xl font-semibold text-center">{level.title}</div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default LevelsPage;
