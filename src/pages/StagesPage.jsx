import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSchool, FaUserGraduate, FaUniversity } from "react-icons/fa";
import {
  addBreadcrumbItem,
  resetBreadcrumbPath,
} from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb";

const StagesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stages, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    // dispatch(getCategories());
    dispatch(resetBreadcrumbPath());

    dispatch(addBreadcrumbItem({ title: "الرئيسية", path: "/" }));
  }, [dispatch]);

  // useEffect(() => {
  //   const catId = categories?.[0]?._id;
  //   if (catId) {
  //     dispatch(getStages(catId));
  //   }
  // }, [dispatch, categories]);

  const handleStageClick = (stage) => {
    dispatch(
      addBreadcrumbItem({
        title: stage.title,
        path: `/LevelsPage?stageId=${stage._id}`,
      })
    );
    navigate(`/LevelsPage?stageId=${stage._id}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />

      <div className="flex flex-col items-center p-12">
        <h2 className="text-3xl font-bold mb-8">المراحل الدراسية</h2>

        {/* Loading indicator */}
        {loading.stages && (
          <p className="text-gray-500 text-lg">
            جاري تحميل المراحل الدراسية...
          </p>
        )}

        {/* Error display */}
        {error.stages && <p className="text-red-500">{error.stages}</p>}

        {/* Show stages only when loaded */}
        {!loading.stages && stages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            {stages.map((stage, index) => (
              <button
                key={stage._id}
                onClick={() => handleStageClick(stage)}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
              >
                <div className="mb-4">
                  {index === 0 ? (
                    <FaSchool size={100} />
                  ) : index === 1 ? (
                    <FaUserGraduate size={100} />
                  ) : (
                    <FaUniversity size={100} />
                  )}
                </div>
                <div className="text-2xl font-semibold text-center">
                  {stage.title}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StagesPage;
