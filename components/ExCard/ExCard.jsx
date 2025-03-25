import { NavLink } from 'react-router-dom';

const ExCard = ({yearData,selected}) => {

  const filteredYearData = yearData.filter(
    (item) =>
      (!selected.courseType || item.courseType === selected.courseType) &&
          (!selected.courseName || item.courseName === selected.courseName),
  );

  console.log('yearData: ', JSON.stringify(yearData, null, 2)); // Properly format yearData
  console.log('filteredYearData: ', JSON.stringify(filteredYearData, null, 2));

  console.log(yearData);

  return (
    <div>

      <div>
        <p>
          { filteredYearData[0].year === 1 && '1st year' }
          { filteredYearData[0].year === 2 && '2nd year' }
          { filteredYearData[0].year === 3 && '3rd year' }
          { filteredYearData[0].year === 4 && '4th year' }
        </p>

      </div>

      { filteredYearData.map((course) =>
        course.listOfSubjects && course.listOfSubjects.length > 0 ? (
          course.listOfSubjects.map((subject, index) => (
            <p key={ subject.subjectId }
              style={ {
                color: subject.allocationStatus === 0 ? '#ED1A1D' : 
                  subject.allocationStatus === 1 ? '#D9DC22' : 
                    subject.allocationStatus === 2 ? '#608F0D' : '#B0B0B0',
              } }
            >
              <NavLink key={ index } to="/ExFacultyAllocation" style={ { textDecoration: 'none', color: 'inherit' } }>
                { subject.className }
              </NavLink>
            </p>
          ))
        ) : (
          <p key={ course.classId }>No subjects available for { course.courseName }</p>
        ),
      ) }

      
  
    </div>
  );
};
  
export default ExCard;
