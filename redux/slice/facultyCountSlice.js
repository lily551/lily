import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Thunk for updating faculty allotedCount**
export const updateFacultyCount = createAsyncThunk(
  "facultyCount/updateFacultyCount",
  async ({ internalFacultyId, newCount }, { rejectWithValue }) => {
    try {
      // PUT request to update the count
      const response = await axios.put(`/api/UpdateFacultyCount/${internalFacultyId}`, {
        allotedCount: newCount,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const facultyCountSlice = createSlice({
  name: "facultyCount",
  initialState: {
    faculties: [], // List of faculties with updated counts
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateFacultyCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFacultyCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the allotedCount in the local state
        const updatedFaculty = action.payload;
        const existingFaculty = state.faculties.find(
          (faculty) => faculty.internalFacultyId === updatedFaculty.internalFacultyId
        );
        if (existingFaculty) {
          existingFaculty.allotedCount = updatedFaculty.allotedCount;
        }
      })
      .addCase(updateFacultyCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default facultyCountSlice.reducer;
