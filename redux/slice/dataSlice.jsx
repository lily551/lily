import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from a given URL using axios
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (url) => {
    const response = await axios.get(url);
    return response.data; // Axios wraps the response data in a `data` property
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    loading: false,
    data: [], // Always ensure data starts as an empty array
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;

