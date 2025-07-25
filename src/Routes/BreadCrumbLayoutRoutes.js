import LessonsPage from "../pages/LessonsPage";
import LevelsPage from "../pages/LevelsPage";
import SemestersPage from "../pages/SemestersPage";
import StagesPage from "../pages/StagesPage";
import SubjectsPage from "../pages/SubjectsPage";
import SubLevelsPage from "../pages/SubLevelsPage";
import UnitsPage from "../pages/UnitsPage";

export const TITLES = Object.freeze({
  STAGES: "المراحل الدراسية",
  LEVELS: "الصفوف الدراسية",
  SUBLEVELS: "الصفوف الفرعية",
  SEMESTERS: "الفصول الدراسية",
  SUBJECTS: "المواد الدراسية",
  UNITS: "الوحدات الدراسية",
  LESSONS: "الدروس",
});

export const BreadCrumbLayoutRoutes = [
  {
    id: 1,
    path: null,
    index: true,
    Element: StagesPage,
    title: TITLES.STAGES,
    nextPageTitle: TITLES.LEVELS,
  },
  {
    id: 2,
    path: "LevelsPage",
    Element: LevelsPage,
    title: TITLES.LEVELS,
    nextPageTitle: `${TITLES.SUBLEVELS} و ${TITLES.SUBJECTS}`,
  },

  {
    id: 3,
    path: "subLevels",
    Element: SubLevelsPage,
    title: TITLES.SUBLEVELS,
    nextPageTitle: TITLES.SUBJECTS,
  },

  {
    id: 4,
    path: "Semesters",
    Element: SemestersPage,
    title: TITLES.SEMESTERS,
    nextPageTitle: TITLES.SUBJECTS,
  },

  {
    id: 5,
    path: "Subjects",
    Element: SubjectsPage,
    title: TITLES.SUBJECTS,
    nextPageTitle: TITLES.UNITS,
  },

  {
    id: 6,
    path: "Units",
    Element: UnitsPage,
    title: TITLES.UNITS,
    nextPageTitle: TITLES.LESSONS,
  },

  {
    id: 7,
    path: "Lessons",
    Element: LessonsPage,
    title: TITLES.LESSONS,
    nextPageTitle: "",
  },
];
