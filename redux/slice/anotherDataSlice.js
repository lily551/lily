import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAnotherData = createAsyncThunk(
  'anotherData/fetchAnotherData',
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching another dataset');
    }
  },
);

const anotherDataSlice = createSlice({
  name: 'anotherData',
  initialState: {
    loading: false,
    data: [], // Separate state for another dataset
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnotherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnotherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnotherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default anotherDataSlice.reducer;
