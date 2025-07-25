import LessonsPage from "../pages/LessonsPage";
import LevelsPage from "../pages/LevelsPage";
import SemestersPage from "../pages/SemestersPage";
import StagesPage from "../pages/StagesPage";
import SubjectsPage from "../pages/SubjectsPage";
import SubLevelsPage from "../pages/SubLevelsPage";
import UnitsPage from "../pages/UnitsPage";

export const BreadCrumbLayoutRoutes = [
  {
    id: 1,
    path: null,
    index: true,
    Element: StagesPage,
    title: "المراحل الدراسية",
  },
  {
    id: 2,
    path: "LevelsPage",
    Element: LevelsPage,
    title: "الصفوف الدراسية",
  },

  {
    id: 3,
    path: "subLevels",
    Element: SubLevelsPage,
    title: "الصفوف الفرعية",
  },

  {
    id: 4,
    path: "Semesters",
    Element: SemestersPage,
    title: "الفصول الدراسية",
  },

  {
    id: 5,
    path: "Subjects",
    Element: SubjectsPage,
    title: "المواد الدراسية",
  },

  {
    id: 6,
    path: "Units",
    Element: UnitsPage,
    title: "الوحدات الدراسية",
  },

  {
    id: 7,
    path: "Lessons",
    Element: LessonsPage,
    title: "الدروس",
  },
];
