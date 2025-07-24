import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getStages,
  getLevels,
  getSubLevels,
  getSemesters,
  getSubjects,
  getUnits,
  getLessons,
} from "../store/categoriesSlice.js";

const InitDataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      const categoriesRes = await dispatch(getCategories());
      if (getCategories.fulfilled.match(categoriesRes)) {
        const categoryId = categoriesRes.payload[0]?._id;

        const stagesRes = await dispatch(getStages(categoryId));
        if (getStages.fulfilled.match(stagesRes)) {
          const stageId = stagesRes.payload[0]?._id;

          const levelsRes = await dispatch(getLevels(stageId));
          if (getLevels.fulfilled.match(levelsRes)) {
            const levelId = levelsRes.payload[0]?._id;

            await dispatch(getSubLevels(levelId));
            const semestersRes = await dispatch(getSemesters(levelId));
            if (getSemesters.fulfilled.match(semestersRes)) {
              const semesterId = semestersRes.payload[0]?._id;

              const subjectsRes = await dispatch(getSubjects(semesterId));
              if (getSubjects.fulfilled.match(subjectsRes)) {
                const subjectId = subjectsRes.payload[0]?._id;

                const unitsRes = await dispatch(getUnits(subjectId));
                if (getUnits.fulfilled.match(unitsRes)) {
                  const unitId = unitsRes.payload[0]?._id;

                  await dispatch(getLessons(unitId));
                }
              }
            }
          }
        }
      }
    };

    fetchAllData();
  }, [dispatch]);

  return null; 
};

export default InitDataLoader;
