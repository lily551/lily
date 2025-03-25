import { configureStore } from '@reduxjs/toolkit';

import anotherDataReducer from './slice/anotherDataSlice';
import dataReducer from './slice/dataSlice';
import facultyAllocationReducer from "./slice/facultyAllocationSlice";
import facultyCountReducer from "./slice/facultyCountSlice"; 
import selectedSubjectReducer from "./slice/selectedSubjectSlice";
import facultyDeallocationReducer from "./slice/facultyDeallocationSlice";


const store = configureStore({
  reducer: {
    data: dataReducer,
    anotherData: anotherDataReducer, 
    facultyAllocation: facultyAllocationReducer,
    selectedSubject: selectedSubjectReducer,
    facultyDeallocation: facultyDeallocationReducer,
  },
});

export default store;
