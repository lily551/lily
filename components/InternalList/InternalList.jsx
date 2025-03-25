import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { allocateFaculty } from "../../redux/slice/facultyAllocationSlice";
import SearchBar from "../SearchBar/SearchBar";
import Spinner from "../Spinner/Spinner";
import { setSelectedSubject } from "../../redux/slice/selectedSubjectSlice";

const InternalList = ({ classDetails, internalDetails }) => {
  const dispatch = useDispatch();
  const selectedSubject = useSelector((state) => state.selectedSubject.value);
  // const [selectedSubject, setSelectedSubject] = useState({
  //   ...selectedSubjectRedux,
  //   facultyList: selectedSubjectRedux.facultyList || [],
  // });
  const { status, error } = useSelector((state) => state.facultyAllocation);

  const [filteredFaculties, setFilteredFaculties] = useState(internalDetails);

  // useEffect(() => {
  //   setSelectedSubject(selectedSubjectRedux);
  // }, [selectedSubjectRedux])

  const handleFacultyClick = async (faculty) => {
    if (!selectedSubject) {
      alert("Please select a subject first!");
      return;
    }
    const isAlreadyAllocated = selectedSubject.facultyList.some(
      (f) => f.internalFacultyId === faculty.internalFacultyId
    );

    if (isAlreadyAllocated) {
      alert("This faculty is already allocated to this subject!");
      return;
    }

    try {
      const result = await dispatch(
        allocateFaculty({
          classId: classDetails.classId,
          subjectId: selectedSubject.subjectId,
          teachingMode: selectedSubject.teachingMode,
          faculty: faculty,
        })
      ).unwrap();

      console.log("✅ Faculty Allocation Result:", result);
      
      if (result) {
        dispatch(setSelectedSubject(result));
        // dispatch(updateFacultyList(result.facultyList));
        console.log("🎉 Faculty allocated successfully!");
      } else {
        console.error("❌ Unexpected response format:", result);
      }
    } catch (error) {
      console.error("⚠️ Failed to allocate faculty:", error);
    }
  };

  return (
    <div>
      <h2>FACULTY LIST</h2>
      <SearchBar internalDetails={internalDetails} onSearchResult={setFilteredFaculties} />
      {status === "loading" && <Spinner />}
      {status === "failed" && <div>Error: {error}</div>}
      {filteredFaculties.map((faculty) => (
        <div key={faculty.internalFacultyId} onClick={() => handleFacultyClick(faculty)}>
          <strong>{faculty.internalFacultyName}</strong>
          <p>Specialization: {faculty.specialization}</p>
        </div>
      ))}
    </div>
  );
};

export default InternalList;
