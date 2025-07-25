import React, { useEffect } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLessons } from "../store/categoriesSlice";
import BreadcrumbV2 from "../components/BreadcrumbV2";
import { useBreadCrumbV2 } from "../hooks/useBreadCrumbV2";

const useQuery = () => new URLSearchParams(useLocation().search);

const LessonsPage = () => {
  const query = useQuery();
  const parentId = query?.get("parentId");
  const { path: breadCrumbPath } = useBreadCrumbV2();

  const dispatch = useDispatch();
  const { lessons, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (parentId) {
      const state = window.history.state;
      console.log({ state });
      dispatch(
        getLessons({ parentId, getPath: !state?.breadcrumbPath?.length })
      );
    }
  }, [dispatch, parentId]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-100 flex flex-col items-center p-12"
    >
      <BreadcrumbV2 data={breadCrumbPath} />
      <h1 className="text-3xl font-bold mb-8">الدروس</h1>

      {loading?.lessons && <p className="text-gray-500 m-4 text-2xl">جاري التحميل...</p>}
      {error?.lessons && <p className="text-red-500">{error.lessons}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {lessons.map((lesson, index) => (
          <button
            key={lesson._id || index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
          >
            <div className="mb-4">
              <FaChalkboardTeacher size={70} />
            </div>
            <div className="text-lg font-semibold text-center">
              {lesson.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
