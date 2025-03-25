import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to send DELETE request
export const deallocateFaculty = createAsyncThunk(
  "facultyDeallocation/deallocateFaculty",
  async ({ classId, subjectId, teachingMode, internalFacultyId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/RegularFacultyAllocation/${classId}/${subjectId}/${teachingMode}/${internalFacultyId}`
      );
      return { internalFacultyId, subjectId, teachingMode };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to deallocate faculty");
    }
  }
);

const facultyDeallocationSlice = createSlice({
  name: "facultyDeallocation",
  initialState: { loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deallocateFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deallocateFaculty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deallocateFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default facultyDeallocationSlice.reducer;
