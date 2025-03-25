import { createSlice } from "@reduxjs/toolkit";
import { initial } from "lodash";
const initialState={
  value:{},
  facultyList:[],
}
const selectedSubjectSlice = createSlice({
  name: "selectedSubject",
  initialState, // Initially, no subject is selected
  reducers: {
    setSelectedSubject: (state, action) => { 
      console.log("action.payload",action.payload)
      return { value: { ...action.payload } };
      //return {...action.payload, facultyList: [...action.payload.facultyList] }; // Poora subject replace karega
    },
    clearSelectedSubject: () => {
      return { ...initialState };
    },
    // updateFacultyList: (state, action) => {
    //   return { 
    //     ...state, 
    //     facultyList: [...action.payload]  
    //   };
    // }
  },
});

export const { setSelectedSubject, clearSelectedSubject, updateFacultyList } = selectedSubjectSlice.actions;
export default selectedSubjectSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { deallocateFaculty } from "./facultyDeallocationSlice"; // Import deallocation action

// const selectedSubjectSlice = createSlice({
//   name: "selectedSubject",
//   initialState: null,
//   reducers: {
//     setSelectedSubject: (state, action) => action.payload,
//     clearSelectedSubject: () => null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(deallocateFaculty.fulfilled, (state, action) => {
//       if (state && state.subjectId === action.payload.subjectId) {
//         state.facultyList = state.facultyList.filter(
//           (faculty) => faculty.internalFacultyId !== action.payload.internalFacultyId
//         );
//       }
//     });
//   },
// });

// export const { setSelectedSubject, clearSelectedSubject } = selectedSubjectSlice.actions;
// export default selectedSubjectSlice.reducer;
