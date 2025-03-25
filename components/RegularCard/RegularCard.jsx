import { useState ,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import Tooltip from '@mui/material/Tooltip';

const RegularCard = ({deptData,selected}) => {

  const sectionWiseData = Object.values(
    deptData.reduce((acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []; 
      }
      acc[item.section].push(item);       
      return acc;
    }, {}),
  );

  const sortedSectionWiseData = sectionWiseData.sort((a, b) => {
    return a[0].section.localeCompare(b[0].section);
  });

  // Create an array of all possible sections
  const sections = sortedSectionWiseData.map((sectionData) => {
    const sectionName = sectionData[0].section; // Extracts the section (A or B)
    return sectionName;
  });

  const [section, setSection] = useState('A');

  const sectionData= sortedSectionWiseData.filter((sectionData)=>{
    const sec=sectionData[0].section;
    return sec===section && sectionData;
  });

  sectionData.sort((a, b) => a.year - b.year);
  const flatSectionData = sectionData[0];

  const filteredSectionData = (flatSectionData || []).filter(
    (item) =>
      (!selected.courseType || item.courseType === selected.courseType) &&
      (!selected.courseName || item.courseName === selected.courseName),
  );  

  return (
    <div>

      <div>
        <p>{ deptData[0].deptName }</p>
      </div>

      <div>
        <Dropdown
          label="SEC"
          options={ sections }
          onSelect={ (selected) => setSection(selected) }
        />
        <p>Total sections - { sections.length } </p>
      </div>

      <div>
        { filteredSectionData.map((item) => (
          <p key={ item.classId }
            style={ {
              color: item.allocationStatus === 0 ? '#ED1A1D' : 
                item.allocationStatus === 1 ? '#D9DC22' : 
                  item.allocationStatus === 2 ? '#608F0D' : '#B0B0B0',
            } }
          >
            <Tooltip title={item.className} placement='top' >
            <NavLink to={ `/panel/RegularFacultyAllocation/${item.classId}` } style={ { textDecoration: 'none', color: 'inherit' } }>
              { item.year === 1 && '1st year' }
              { item.year === 2 && '2nd year' }
              { item.year === 3 && '3rd year' }
              { item.year === 4 && '4th year' }
            </NavLink>
            </Tooltip>
          </p>
        )) }
      </div>

    </div>
  );
};

export default RegularCard;
