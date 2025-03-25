import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSubject, clearSelectedSubject } from "../../redux/slice/selectedSubjectSlice";
import Subject from "../Subject/Subject";

const SubjectList = ({ classDetails }) => {
  const dispatch = useDispatch();
  const selectedSubject = useSelector((state) => state.selectedSubject.value);
  const [selectedMode, setSelectedMode] = useState(0); // 0 = Theory, 1 = Practical 

  // Filter subjects based on selected mode (Theory/Practical)
  const filteredSubjects = classDetails?.subjectList?.filter(
    (subject) => subject.teachingMode === selectedMode
  ) || [];

  return (
    <div>
      <h2>SUBJECT LIST</h2>
      <button onClick={() => setSelectedMode(selectedMode === 0 ? 1 : 0)}>
        {selectedMode === 0 ? "Theory" : "Practical"}
      </button>

      {filteredSubjects.map((subject) => (
        <Subject
          key={`${subject.subjectId}-${subject.teachingMode}`}
          subject={subject}
          classDetails={classDetails}
          isSelected={selectedSubject.value?.subjectId === subject.subjectId}
          onSelectSubject={() => {
            if (selectedSubject.value?.subjectId === subject.subjectId) {
              console.log("Deselecting subject:", subject);
              dispatch(clearSelectedSubject()); // Deselect if already selected
            } else {
              console.log("Selecting subject:", subject);
              dispatch(setSelectedSubject(subject)); // Select the subject
            }
          }}
        />
      ))}
    </div>
  );
};

export default SubjectList;
