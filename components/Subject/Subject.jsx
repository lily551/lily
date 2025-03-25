import { useDispatch } from "react-redux";
import { deallocateFaculty } from "../../redux/slice/facultyDeallocationSlice";
import { setSelectedSubject, clearSelectedSubject } from "../../redux/slice/selectedSubjectSlice";
import { ImBin } from "react-icons/im";
import { useState, useEffect } from "react";

const Subject = ({ subject, onSelectSubject, isSelected,classDetails}) => {
  const dispatch = useDispatch();
  
  const handleDeallocate = (faculty) => {
    dispatch(
      deallocateFaculty({
        classId: classDetails.classId,
        subjectId: subject.subjectId,
        teachingMode: subject.teachingMode,
        internalFacultyId: faculty.internalFacultyId,
      })
    );
  };

  return (
    <div
      onClick={() => onSelectSubject(subject)}
      style={{
        backgroundColor: isSelected ? "brown" : "grey",
        padding: "10px",
        margin: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <h3>
        {subject.subjectCode} {subject.subjectName} -{" "}
        {subject.teachingMode === 0 ? "Theory" : "Practical"}
      </h3>

      <ul>
        {subject.facultyList.map((faculty) => (
          <li key={faculty.internalFacultyId} style={{ display: "flex", alignItems: "center" }}>
            {faculty.internalFacultyName}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop parent div click
                handleDeallocate(faculty);
              }}
              style={{
                backgroundColor: isSelected ? "brown" : "grey",
                marginLeft: "10px",
                color: "#F63639",
                border: "none",
                padding: "5px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              <ImBin />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subject;
