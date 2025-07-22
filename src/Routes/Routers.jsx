import { Routes, Route } from "react-router-dom";
import StagesPage from "../pages/StagesPage";
import LevelsPage from "../pages/LevelsPage";
import SemestersPage from "../pages/SemestersPage";
import SubjectsPage from "../pages/SubjectsPage";
import UnitsPage from "../pages/UnitsPage";
import LessonsPage from "../pages/LessonsPage";
import SubLevelsPage from "../pages/SubLevelsPage";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<StagesPage to="/" />} />
      <Route path="LevelsPage" element={<LevelsPage />} />
       <Route path="subLevels" element={<SubLevelsPage />} />
      <Route path="Semesters" element={<SemestersPage />} />
      <Route path="Subjects" element={<SubjectsPage />} />
       <Route path="Units" element={<UnitsPage />} />
       <Route path="Lessons" element={<LessonsPage />} />

    </Routes>
  );
};

export default Routers;
