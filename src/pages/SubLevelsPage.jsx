import { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubLevels,
  getSemesters,
  addBreadcrumbItem,
  resetBreadcrumbPath,
} from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb";
import {
  useBreadcrumbNavigate,
  useBreadCrumbV2,
} from "../hooks/useBreadCrumbV2";
import BreadcrumbV2 from "../components/BreadcrumbV2";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SubLevelsPage = () => {
  const query = useQuery();
  const levelId = query.get("levelId");
  const dispatch = useDispatch();
  const { path: breadCrumbPath } = useBreadCrumbV2();
  const navigateAndPushState = useBreadcrumbNavigate();

  // نجيب subLevels والloading والerror
  const { subLevels, loading, error, levels, stages } = useSelector(
    (state) => state.category
  );

  // 1. Load data when levelId changes
  useEffect(() => {
    if (levelId) {
      const state = window.history.state;
      dispatch(
        getSubLevels({ levelId, getPath: !state?.breadcrumbPath?.length })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId]);

  // 2. Build breadcrumb after levels and stages are available
  useEffect(() => {
    if (levelId && levels.length > 0 && stages.length > 0) {
      dispatch(resetBreadcrumbPath());
      dispatch(addBreadcrumbItem({ title: "الرئيسية", path: "/" }));

      const currentLevel = levels.find((lvl) => lvl._id === levelId);
      if (currentLevel) {
        const currentStage = stages.find(
          (stg) => stg._id === currentLevel.stage
        );
        if (currentStage) {
          dispatch(
            addBreadcrumbItem({
              title: currentStage.title,
              path: `/LevelsPage?stageId=${currentStage._id}`,
            })
          );
        }

        dispatch(
          addBreadcrumbItem({
            title: currentLevel.title,
            path: `/LevelsPage?levelId=${levelId}`,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId]);

  const handleLevelClick = async (subLevel) => {
    const breadcrumb = {
      label: subLevel.title,
      to: `${location.pathname}${location.search || ""}`,
      id: subLevel._id,
    };

    if (subLevel) {
      dispatch(
        addBreadcrumbItem({
          title: subLevel.title,
          path: `/Semesters?subLevelId=${subLevel._id}`,
        })
      );
    }

    const resultAction = await dispatch(getSemesters(subLevel._id));
    const data = resultAction.payload;

    if (Array.isArray(data) && data.length === 1) {
      navigateAndPushState(`/Subjects?semesterId=${data[0]._id}`, breadcrumb);
    } else if (Array.isArray(data) && data.length > 1) {
      navigateAndPushState(`/Semesters?subLevelId=${subLevel._id}`, breadcrumb);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      {/* <Breadcrumb /> */}
      <BreadcrumbV2 data={breadCrumbPath} nextPageTitle="المواد الدراسية" />

      <div className="flex flex-col items-center p-12">
        <h1 className="text-3xl font-bold mb-8">الصفوف الفرعية</h1>

        {loading?.subLevels && (
          <p className="text-blue-500 animate-pulse text-lg">جاري التحميل...</p>
        )}
        {error?.subLevels && <p className="text-red-500">{error?.subLevels}</p>}

        {!loading?.subLevels && subLevels.length === 0 && (
          <p className="text-gray-500 text-md">لا توجد صفوف فرعية متاحة.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {subLevels.map((level) => (
            <div
              key={level._id}
              onClick={() => handleLevelClick(level)}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
            >
              <div className="mb-4">
                <FaBookOpen size={80} />
              </div>
              <div className="text-xl font-semibold text-center">
                {level.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubLevelsPage;
