import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getStages,
  // getLevels,
  // getSubLevels,
  // getSemesters,
} from "../store/categoriesSlice.js";

const InitDataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        if (!localStorage.getItem("categories")) {
          const categoriesRes = await dispatch(getCategories());
          if (!getCategories.fulfilled.match(categoriesRes)) return;

          const categoryId = categoriesRes.payload?.[0]?._id;
          if (!categoryId) return;

          const stagesRes = await dispatch(getStages(categoryId));
          if (!getStages.fulfilled.match(stagesRes)) return;

          // ! next code break the app on first init
          // console.log({ stagesRes });
          // const stageId = stagesRes.payload?.[0]?._id;
          // if (!stageId) return;

          // const levelsRes = await dispatch(getLevels(stageId));
          // if (!getLevels.fulfilled.match(levelsRes)) return;

          // const levelId = levelsRes.payload?.[0]?._id;
          // if (!levelId) return;

          // await dispatch(getSubLevels(levelId));
          // await dispatch(getSemesters(levelId));
        }
      } catch (error) {
        console.error("خطأ في التحميل:", error);
      }
    };

    fetchAllData();
  }, [dispatch]);

  return null;
};

export default InitDataLoader;
