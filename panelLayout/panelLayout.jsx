import {Routes, Route } from 'react-router-dom';
import Heading from '../components/Heading/Heading';
import Sidebar from '../components/Sidebar/Sidebar';
import CustomSidebar from '../components/Sidebar/NewSidebar';
import Dashboard from '../pages/dashboard/PanelDashboardPage';
import ExFacultyAllocation from '../pages/ExFacultyAllocation/ExFacultyAllocation';
import FacultyAllocation from '../pages/FacultyAllocation/FacultyAllocation';
import RegularFacultyAllocation from '../pages/RegularFacultyAllocation/RegularFacultyAllocation';
import styles from "./panelLayout.module.css";

function panelLayout() {

  return (
    <div>
      <div>
      <Sidebar/>
      </div>
      <div>
      <Heading/>
      <Routes>
        { /* <Route path="/" element={<h1>Tanuvi Goyal</h1>}/> */ }
        <Route path="/Dashboard" element={ <Dashboard /> } />
        <Route path="/CustomSidebar" element={ <CustomSidebar /> } />
        <Route path="/FacultyAllocation" element={ <FacultyAllocation /> } />
        <Route path="/RegularFacultyAllocation/:classId" element={ <RegularFacultyAllocation /> } />
        <Route path="/ExFacultyAllocation" element={ <ExFacultyAllocation /> } />
      </Routes>
      </div>
    </div>
  );
}
export default panelLayout;
