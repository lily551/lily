import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    // <div className='Side-bar'>
    //   My Sidebar
    //   <div>
          
    //   </div>
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-image"></div>
        <div className="user-name">User Name</div> 
        <div className="user-department">Computer Department</div>
      </div>

      <div className='nav-links'>
        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          MY PROFILE
          </div>
        </NavLink>

        <div></div>

        <NavLink to="panel/Dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          DASHBOARD
          </div>
        </NavLink>

        <div></div>

        <NavLink to="/panel/FacultyAllocation" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon"/>
          <div className="nav-text">
          FACULTY ALLOCATION
          </div>
        </NavLink>

        <div></div>

        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          CHECK FACULTY STATUS
          </div>
        </NavLink>

        <div></div>

        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          VIVA EXAMINER ALLOCATION
          </div>
        </NavLink>

        <div></div>

        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          CHECK VIVA STATUS
          </div>
        </NavLink>

        <div></div>

        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          EXTERNAL EXPERT LIST
          </div>
        </NavLink>

        <div></div>

        <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}> 
          <CgProfile className="nav-icon" />
          <div className="nav-text">
          NOTIFICATIONS
          </div>
          
        </NavLink>
        <div></div>

      </div>

      <div className="footer-links">
        <NavLink className="footer-item"> 
          <CgProfile className="footer-icon"/>
          <div className="footer-text">
            SETTINGS
          </div>
        </NavLink>

        <NavLink className="footer-item">
          <CgProfile className="footer-icon"/>
          <div className="footer-text">
              LOGOUT
          </div>
        </NavLink>
      </div>
  
    </div>
  );
};

export default Sidebar;