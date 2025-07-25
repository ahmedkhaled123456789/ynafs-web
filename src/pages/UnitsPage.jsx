import { useEffect } from "react";
import { FaChevronDown, FaLayerGroup } from "react-icons/fa";
import { Link, useLocation /* useNavigate */ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnits,
  addBreadcrumbItem,
  resetBreadcrumbPath,
  getSubjects,
  getLevels,
  getStages,
  getSemesters,
} from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb"; // ✅
import { useBreadCrumbV2 } from "../hooks/useBreadCrumbV2";
import BreadcrumbV2 from "../components/BreadcrumbV2";
const useQuery = () => new URLSearchParams(useLocation().search);

const UnitsPage = () => {
  const query = useQuery();
  const subjectId = query.get("subjectId");

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { path: breadCrumbPath } = useBreadCrumbV2();

  const { levels, units, stages, subjects, semesters, loading, error } =
    useSelector((state) => state.category);
  // تحميل الوحدات
  useEffect(() => {
    if (subjectId) {
      const state = window.history.state;
      dispatch(
        getUnits({ subjectId, getPath: !state?.breadCrumbPath?.length })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  // تحميل البيانات الأساسية لو مش موجودة
  useEffect(() => {
    if (subjectId) {
      const currentSubject = subjects.find((sub) => sub._id === subjectId);
      const semesterId = currentSubject?.semester;

      if (semesterId && semesters.length === 0) {
        dispatch(getSemesters());
      }

      if (subjects.length === 0) {
        dispatch(getSubjects(semesterId));
      }

      if (levels.length === 0) {
        dispatch(getLevels());
      }

      if (stages.length === 0) {
        dispatch(getStages());
      }
    }
  }, [dispatch, subjectId, subjects, semesters, levels, stages]);

  // بناء مسار التنقل Breadcrumb
  useEffect(() => {
    if (
      subjectId &&
      subjects.length &&
      semesters.length &&
      levels.length &&
      stages.length
    ) {
      const currentSubject = subjects.find((sub) => sub._id === subjectId);
      const semesterId = currentSubject?.semester;
      const currentSemester = semesters.find((sem) => sem._id === semesterId);
      const currentLevel = levels.find(
        (lvl) => lvl._id === currentSemester?.level
      );
      const currentStage = stages.find(
        (stg) => stg._id === currentLevel?.stage
      );

      dispatch(resetBreadcrumbPath());
      dispatch(addBreadcrumbItem({ title: "الرئيسية", path: "/" }));

      if (currentStage) {
        dispatch(
          addBreadcrumbItem({
            title: currentStage.title,
            path: `/LevelsPage?stageId=${currentStage._id}`,
          })
        );
      }

      if (currentLevel) {
        dispatch(
          addBreadcrumbItem({
            title: currentLevel.title,
            path: `/LevelsPage?levelId=${currentLevel._id}`,
          })
        );
      }

      if (currentSemester && currentSemester.title !== "الفصل الدراسي الأول") {
        dispatch(
          addBreadcrumbItem({
            title: currentSemester.title,
            path: `/Subjects?semesterId=${currentSemester._id}`,
          })
        );
      }

      if (currentSubject) {
        dispatch(
          addBreadcrumbItem({
            title: currentSubject.title,
            path: `/Units?subjectId=${currentSubject._id}`,
          })
        );
      }
    }
  }, [dispatch, subjectId, subjects, semesters, levels, stages]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 ">
      {/* <Breadcrumb /> */}

      <BreadcrumbV2 data={breadCrumbPath} />
      <div className="flex flex-col items-center p-12">
        <h1 className="text-3xl font-bold mb-8">الوحدات الدراسية</h1>

        {loading?.units && <p className="text-gray-500">جاري التحميل...</p>}
        {error?.units && <p className="text-red-500">{error.units}</p>}

        <div className="flex flex-col gap-3 w-full max-w-6xl">
          {units.map((unit, index) => (
            <div key={unit._id || index}>
              <div
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
                // className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
              >
                <div className="text-lg font-semibold !text-right w-full flex items-center justify-between">
                  <div>{unit.title}</div>
                  <div>
                    <FaChevronDown className="rotate-180" />
                  </div>
                </div>
              </div>

              {unit.chapters?.length ? (
                unit.chapters.map((chapter) => {
                  return (
                    <div
                      key={chapter._id || index}
                      className="bg-gray-200 cursor-pointer shadow-md p-2 hover:bg-[#0093e9] hover:text-white transition text-right w-full"
                    >
                      <div>{chapter.title}</div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitsPage;
