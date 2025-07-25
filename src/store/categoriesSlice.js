import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { assignChaptersToUnits, filterCurrentYearBooks } from "../handlers";
import axiosRequest from "../Api/axiosRequest";
import {
  getDataAndHandleBreadCrumb,
  // handlePushAndResetBreadCrumbState,
} from "../hooks/useBreadCrumbV2";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_id, thunkAPI) => {
    try {
      const res = await axiosRequest.get(`/api/books/categories`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getStages = createAsyncThunk(
  "stages/getStages",
  async (id, thunkAPI) => {
    try {
      const res = await axiosRequest.get(`/api/books/stages?category=${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLevels = createAsyncThunk(
  "levels/getLevels",
  async ({ stageId, getPath }, thunkAPI) => {
    try {
      const res = await getDataAndHandleBreadCrumb({
        getPath,
        url: `api/books/levels?stage=${stageId}`,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSubLevels = createAsyncThunk(
  "levels/getSubLevels",
  async ({ levelId, getPath }, thunkAPI) => {
    try {
      const res = await getDataAndHandleBreadCrumb({
        getPath,
        url: `/api/books/levels?parent=${levelId}`,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSemesters = createAsyncThunk(
  "semesters/getSemesters",
  async (id, thunkAPI) => {
    try {
      const res = await axiosRequest.get(`/api/books/semesters?level=${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSubjects = createAsyncThunk(
  "subjects/getSubjects",
  async ({ semesterId, getPath }, thunkAPI) => {
    try {
      const res = await getDataAndHandleBreadCrumb({
        getPath,
        url: `/api/books/subjects?semester=${semesterId}`,
      });

      return filterCurrentYearBooks(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUnits = createAsyncThunk(
  "units/getUnits",
  async ({ subjectId, getPath }, thunkAPI) => {
    try {
      const res = await getDataAndHandleBreadCrumb({
        getPath,
        url: `/api/books/units?subject=${subjectId}`,
      });
      return assignChaptersToUnits(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getLessons = createAsyncThunk(
  "lessons/getLessons",
  async (id, thunkAPI) => {
    try {
      const res = await axiosRequest.get(`/api/books/lessons?parent=${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || [],
  stages: JSON.parse(localStorage.getItem("stages")) || [],
  levels: JSON.parse(localStorage.getItem("levels")) || [],
  subLevels: JSON.parse(localStorage.getItem("subLevels")) || [],
  semesters: JSON.parse(localStorage.getItem("semesters")) || [],
  subjects: [],
  units: [],
  lessons: [],
  breadcrumbPath: JSON.parse(localStorage.getItem("breadcrumbPath")) || [
    { title: "الرئيسية", path: "/" },
  ],
  loading: {
    categories: false,
    stages: false,
    levels: false,
    subLevels: false,
    semesters: false,
    subjects: false,
    units: false,
    lessons: false,
  },
  error: {
    categories: null,
    stages: null,
    levels: null,
    subLevels: null,
    semesters: null,
    subjects: null,
    units: null,
    lessons: null,
  },
};

const mergeUnique = (original, incoming) => {
  const existingIds = new Set(original.map((item) => item._id));
  const newItems = incoming.filter((item) => !existingIds.has(item._id));
  return [...original, ...newItems];
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setBreadcrumbPath: (state, action) => {
      const filtered = [];
      const seenPaths = new Set();

      for (let item of action.payload) {
        if (!seenPaths.has(item.path)) {
          seenPaths.add(item.path);
          filtered.push(item);
        }
      }

      state.breadcrumbPath = filtered;
      localStorage.setItem("breadcrumbPath", JSON.stringify(filtered));
    },

    addBreadcrumbItem: (state, action) => {
      const exists = state.breadcrumbPath.find(
        (item) => item.path === action.payload.path
      );
      if (!exists) {
        state.breadcrumbPath.push(action.payload);

        localStorage.setItem(
          "breadcrumbPath",
          JSON.stringify(state.breadcrumbPath)
        );
      }
    },
    resetBreadcrumbPath: (state) => {
      state.breadcrumbPath = [{ title: "الرئيسية", path: "/" }];
      localStorage.setItem(
        "breadcrumbPath",
        JSON.stringify(state.breadcrumbPath)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = mergeUnique(state.categories, action.payload);
        state.loading.categories = false;
        localStorage.setItem("categories", JSON.stringify(state.categories)); // ✅
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload || action.error.message;
      })
      .addCase(getStages.pending, (state) => {
        state.loading.stages = true;
        state.error.stages = null;
      })
      .addCase(getStages.fulfilled, (state, action) => {
        state.stages = mergeUnique(state.stages, action.payload);
        state.loading.stages = false;
        localStorage.setItem("stages", JSON.stringify(state.stages)); // ✅
      })
      .addCase(getStages.rejected, (state, action) => {
        state.loading.stages = false;
        state.error.stages = action.payload || action.error.message;
      })

      .addCase(getLevels.pending, (state) => {
        state.loading.levels = true;
        state.error.levels = null;
      })
      .addCase(getLevels.fulfilled, (state, action) => {
        state.levels = action.payload;
        state.loading.levels = false;
        localStorage.setItem("levels", JSON.stringify(state.levels)); // ✅
      })
      .addCase(getLevels.rejected, (state, action) => {
        state.loading.levels = false;
        state.error.levels = action.payload || action.error.message;
      })

      .addCase(getSubLevels.pending, (state) => {
        state.loading.subLevels = true;
        state.error.subLevels = null;
      })
      .addCase(getSubLevels.fulfilled, (state, action) => {
        state.subLevels = action.payload;
        state.loading.subLevels = false;
        localStorage.setItem("subLevels", JSON.stringify(state.subLevels)); // ✅
      })
      .addCase(getSubLevels.rejected, (state, action) => {
        state.loading.subLevels = false;
        state.error.subLevels = action.payload || action.error.message;
      })

      .addCase(getSemesters.pending, (state) => {
        state.loading.semesters = true;
        state.error.semesters = null;
      })
      .addCase(getSemesters.fulfilled, (state, action) => {
        state.semesters = action.payload;
        state.loading.semesters = false;
        localStorage.setItem("semesters", JSON.stringify(state.semesters)); // ✅
      })
      .addCase(getSemesters.rejected, (state, action) => {
        state.loading.semesters = false;
        state.error.semesters = action.payload || action.error.message;
      })

      .addCase(getSubjects.pending, (state) => {
        state.loading.subjects = true;
        state.error.subjects = null;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading.subjects = false;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading.subjects = false;
        state.error.subjects = action.payload || action.error.message;
      })

      .addCase(getUnits.pending, (state) => {
        state.loading.units = true;
        state.error.units = null;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.units = action.payload;
        state.loading.units = false;
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.loading.units = false;
        state.error.units = action.payload || action.error.message;
      })

      .addCase(getLessons.pending, (state) => {
        state.loading.lessons = true;
        state.error.lessons = null;
      })
      .addCase(getLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.loading.lessons = false;
      })
      .addCase(getLessons.rejected, (state, action) => {
        state.loading.lessons = false;
        state.error.lessons = action.payload || action.error.message;
      });
  },
});

export const { setBreadcrumbPath, addBreadcrumbItem, resetBreadcrumbPath } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
