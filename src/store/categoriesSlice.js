import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../hooks/useGetData'
 
export const getCategories = createAsyncThunk('categories/getCategories', async (_id, thunkAPI) => {
  try {
    const res = await useGetData(`/api/books/categories`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getStages = createAsyncThunk('stages/getStages', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`/api/books/stages?category=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const getLevels= createAsyncThunk('levels/getLevels', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`api/books/levels?stage=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const getSubLevels= createAsyncThunk('levels/getSubLevels', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`api/books/levels?parent=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const getSemesters= createAsyncThunk('semesters/getSemesters', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`/api/books/semesters?level=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getSubjects= createAsyncThunk('subjects/getSubjects', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`/api/books/subjects?semester=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getUnits= createAsyncThunk('units/getUnits', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`/api/books/units?subject=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getLessons= createAsyncThunk('lessons/getLessons', async (id, thunkAPI) => {
  try {
    const res = await useGetData(`/api/books/lessons?parent=${id}`);
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const initialState = {
  categories: [],
  stages:[],
  levels: [],
  subLevels: [],
  semesters: [],
  subjects: [],
  units: [],
  lessons: [],
 };

const categoriesSlice = createSlice({
  name: "category", 
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
   
 builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories=action.payload;
      })
    builder.addCase(getStages.fulfilled, (state, action) => {
      state.stages=action.payload;
      console.log(state.stages)
     })
    builder.addCase(getLevels.fulfilled, (state, action) => {
      state.levels=action.payload;
     })
      builder.addCase(getSubLevels.fulfilled, (state, action) => {
      state.subLevels=action.payload;
     })
      builder.addCase(getSemesters.fulfilled, (state, action) => {
      state.semesters=action.payload;
     })
      builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.subjects=action.payload;
     })
     builder.addCase(getUnits.fulfilled, (state, action) => {
      state.units=action.payload;
     })
     builder.addCase(getLessons.fulfilled, (state, action) => {
      state.lessons=action.payload;
     })
  },
})
export default categoriesSlice.reducer;
