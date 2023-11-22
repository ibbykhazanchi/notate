import React, {useState} from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
// import './Sidebar.css'


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
    </div>
  );
}

export default Sidebar;
