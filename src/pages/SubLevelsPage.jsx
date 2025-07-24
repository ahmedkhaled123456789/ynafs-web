import { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubLevels, getSemesters, addBreadcrumbItem, resetBreadcrumbPath } from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SubLevelsPage = () => {
  const query = useQuery();
  const levelId = query.get("levelId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // نجيب subLevels والloading والerror
  const { subLevels, loading, error, levels, stages } = useSelector((state) => ({
    subLevels: state.category.subLevels,
    loading: state.category.loading.subLevels,
    error: state.category.error?.subLevels || null,
    levels: state.category.levels,
    stages: state.category.stages,
  }));

  // 1. Load data when levelId changes
useEffect(() => {
  if (levelId) {
    dispatch(getSubLevels(levelId));
  }
}, [dispatch, levelId]);

// 2. Build breadcrumb after levels and stages are available
useEffect(() => {
  if (levelId && levels.length > 0 && stages.length > 0) {
    dispatch(resetBreadcrumbPath());
    dispatch(addBreadcrumbItem({ title: "الرئيسية", path: "/" }));
    dispatch(addBreadcrumbItem({ title: "المراحل الدراسية", path: "/StagesPage" }));

    const currentLevel = levels.find((lvl) => lvl._id === levelId);
    if (currentLevel) {
      const currentStage = stages.find((stg) => stg._id === currentLevel.stage);
      if (currentStage) {
        dispatch(addBreadcrumbItem({
          title: currentStage.title,
          path: `/LevelsPage?stageId=${currentStage._id}`
        }));
      }

      dispatch(addBreadcrumbItem({
        title: currentLevel.title,
        path: `/SubLevelsPage?levelId=${levelId}`
      }));
    }
  }
}, [dispatch, levelId, levels, stages]);

  const handleLevelClick = async (subLevelId) => {
     const clickedSubLevel = subLevels.find((sl) => sl._id === subLevelId);
    if (clickedSubLevel) {
      dispatch(addBreadcrumbItem({ title: clickedSubLevel.title, path: `/Semesters?subLevelId=${subLevelId}` }));
    }

     const resultAction = await dispatch(getSemesters(subLevelId));
    const data = resultAction.payload;

    if (Array.isArray(data) && data.length === 1) {
      navigate(`/Subjects?semesterId=${data[0]._id}`);
    } else if (Array.isArray(data) && data.length > 1) {
      navigate(`/Semesters?subLevelId=${subLevelId}`);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <Breadcrumb />

      <div className="flex flex-col items-center p-12">
        <h1 className="text-3xl font-bold mb-8">الصفوف الفرعية</h1>

        {loading && (
          <p className="text-blue-500 animate-pulse text-lg">جاري التحميل...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && subLevels.length === 0 && (
          <p className="text-gray-500 text-md">لا توجد صفوف فرعية متاحة.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {subLevels.map((level) => (
            <div
              key={level._id}
              onClick={() => handleLevelClick(level._id)}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
            >
              <div className="mb-4">
                <FaBookOpen size={80} />
              </div>
              <div className="text-xl font-semibold text-center">{level.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubLevelsPage;
