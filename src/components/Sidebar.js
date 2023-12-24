import React, {useState} from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "../data/SidebarData";
import '../Sidebar.css'


function Sidebar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <div>
        <div className="sidebar">
        <Link to="#" className="menu-bars">
          <FaBars onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" id="bootstrap-override">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose onClick={showSidebar} />
            </Link>
          </li> 
          {SidebarData.map((item, index) => {
            return(
              <div onClick={showSidebar}>
                <li key = {index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              </div>
            )
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
