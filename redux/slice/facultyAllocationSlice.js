import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Thunk to send POST request**
export const allocateFaculty = createAsyncThunk(
  "facultyAllocation/allocateFaculty",
  async ({ classId, subjectId, teachingMode, faculty }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/RegularFacultyAllocation/${classId}/${subjectId}/${teachingMode}`,
        {
          internalFacultyId: faculty.internalFacultyId,
          internalFacultyName: faculty.internalFacultyName,
          facultyPhoto: faculty.facultyPhoto,
        }
      );
      return response.data.subject; // Returning response for Redux state update
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const facultyAllocationSlice = createSlice({
  name: "facultyAllocation",
  initialState: {
    allocatedFaculties: [], // Holds allocated faculty data
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // allocateFacultySuccess: (state) => {
    //   state.facultyAllocated = !state.facultyAllocated;  // Toggle value to trigger re-fetch
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(allocateFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allocateFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allocatedFaculties.push(action.payload); // Update state with allocated faculty
      })
      .addCase(allocateFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { allocateFacultySuccess } = facultyAllocationSlice.actions;

export default facultyAllocationSlice.reducer;
