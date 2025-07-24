import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUnits, addBreadcrumbItem, resetBreadcrumbPath, getSubjects, getLevels, getStages, getSemesters } from "../store/categoriesSlice";
import Breadcrumb from "../components/Breadcrumb"; // ✅
const useQuery = () => new URLSearchParams(useLocation().search);

const UnitsPage = () => {
  const query = useQuery();
  const subjectId = query.get("subjectId");

  const dispatch = useDispatch();

  const { levels,units,stages, subjects, semesters, loading, error } = useSelector((state) => ({
    units: state.category.units,
    subjects: state.category.subjects,
    semesters: state.category.semesters,
        levels: state.category.levels,
    loading: state.category.loading.units,
    error: state.category.error.units,
        stages: state.category.stages,

  }));
// تحميل الوحدات
  useEffect(() => {
    if (subjectId) {
      dispatch(getUnits(subjectId));
    }
  }, [dispatch, subjectId]);

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
    if (subjectId && subjects.length && semesters.length && levels.length && stages.length) {
      const currentSubject = subjects.find((sub) => sub._id === subjectId);
      const semesterId = currentSubject?.semester;
      const currentSemester = semesters.find((sem) => sem._id === semesterId);
      const currentLevel = levels.find((lvl) => lvl._id === currentSemester?.level);
      const currentStage = stages.find((stg) => stg._id === currentLevel?.stage);

      dispatch(resetBreadcrumbPath());
      dispatch(addBreadcrumbItem({ title: "الرئيسية", path: "/" }));
 
      if (currentStage) {
        dispatch(addBreadcrumbItem({
          title: currentStage.title,
          path: `/LevelsPage?stageId=${currentStage._id}`,
        }));
      }

      if (currentLevel) {
        dispatch(addBreadcrumbItem({
          title: currentLevel.title,
          path: `/LevelsPage?levelId=${currentLevel._id}`,
        }));
      }

      if (currentSemester && currentSemester.title !== "الفصل الدراسي الأول") {
        dispatch(addBreadcrumbItem({
          title: currentSemester.title,
          path: `/Subjects?semesterId=${currentSemester._id}`,
        }));
      }

      if (currentSubject) {
        dispatch(addBreadcrumbItem({
          title: currentSubject.title,
          path: `/Units?subjectId=${currentSubject._id}`,
        }));
      }
    }
  }, [dispatch, subjectId, subjects, semesters, levels, stages]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 ">
      <Breadcrumb />
      <div className="flex flex-col items-center p-12">
          <h1 className="text-3xl font-bold mb-8">الوحدات الدراسية</h1>

      {loading && <p className="text-gray-500">جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {units.map((unit, index) => (
          <Link
            to={`/Lessons?unitId=${unit._id}`}
            key={unit._id || index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:bg-[#0093e9] hover:text-white transition"
          >
            <div className="mb-4"><FaLayerGroup size={70} /></div>
            <div className="text-lg font-semibold text-center">{unit.title}</div>
          </Link>
        ))}
      </div>
      </div>

    
    </div>
  );
};

export default UnitsPage;
