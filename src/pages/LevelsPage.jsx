import React, { useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLevels,
  getSemesters,
  addBreadcrumbItem,
  resetBreadcrumbPath,
  // getStages,
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

const LevelsPage = () => {
  const query = useQuery();
  const stageId = query.get("stageId");
  const dispatch = useDispatch();
  const { levels, loading, error, stages } = useSelector(
    (state) => state.category
  );
  const { path: breadCrumbPath } = useBreadCrumbV2();
  const navigateAndPushState = useBreadcrumbNavigate();

  useEffect(() => {
    if (stageId) {
      const state = window.history.state;
      console.log({ state });
      dispatch(getLevels({ stageId, getPath: !state?.breadcrumbPath?.length }));
      // dispatch(getStages(stageId));
    }
  }, [dispatch, stageId]);

  useEffect(() => {
    if (stageId && stages.length > 0) {
      dispatch(resetBreadcrumbPath());
      dispatch(addBreadcrumbItem({ title: "الرئيسية", path: "/" }));

      const currentStage = stages.find((s) => s._id === stageId);
      if (currentStage) {
        dispatch(
          addBreadcrumbItem({
            title: currentStage.title,
            path: `/LevelsPage?stageId=${stageId}`,
          })
        );
      }
    }
  }, [dispatch, stageId, stages]);

  const handleLevelClick = async (level) => {
    dispatch(
      addBreadcrumbItem({
        title: level.title,
        path: `/subLevels?levelId=${level._id}`,
      })
    );

    const breadcrumb = {
      label: level.title,
      to: `${location.pathname}${location.search || ""}`,
      id: level._id,
    };

    if (level.subLevels && level.subLevels.length > 0) {
      navigateAndPushState(`/subLevels?levelId=${level._id}`, breadcrumb);
    } else {
      const resultAction = await dispatch(getSemesters(level._id));
      const data = resultAction.payload;
      if (Array.isArray(data) && data.length === 1) {
        // state.breadcrumbPath.push({
        //   label: data[0].title,
        //   to: `${location.pathname}${location.search || ""}`,
        //   id: data[0]._id,
        // });

        dispatch(
          addBreadcrumbItem({
            title: data[0].title || "الفصل الدراسي",
            path: `/Subjects?semesterId=${data[0]._id}`,
          })
        );

        navigateAndPushState(`/Subjects?semesterId=${data[0]._id}`, breadcrumb);
      }
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      {/* <Breadcrumb /> */}
      <BreadcrumbV2
        data={breadCrumbPath}
        nextPageTitle="المواد الدراسية والمراحل الفرعية"
      />

      <div className="flex flex-col items-center p-12">
        <h1 className="text-3xl font-bold mb-8">الصفوف الدراسية</h1>

        {/* حالة التحميل */}
        {loading.levels && (
          <div className="text-gray-600 text-lg py-8">
            جاري تحميل الصفوف الدراسية...
          </div>
        )}

        {/* عرض الأخطاء */}
        {error.levels && <p className="text-red-500 text-lg">{error.levels}</p>}

        {/* عرض البيانات عند انتهاء التحميل */}
        {!loading.levels && levels.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {levels.map((level) => (
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
        )}

        {/* في حالة لا يوجد بيانات */}
        {!loading.levels && levels.length === 0 && (
          <div className="text-gray-600 py-6">لا توجد صفوف متاحة حاليًا.</div>
        )}
      </div>
    </div>
  );
};

export default LevelsPage;
