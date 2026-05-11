import { FaBars, FaSearch } from "react-icons/fa";
import './header.css';
import { FiBell } from "react-icons/fi";

function Header({isOpen,setIsOpen}) {


  return (
    <div className="header">
        
      <div className="header_left">
        <button className="menu_btn" onClick={()=>setIsOpen(!isOpen)}>
          <FaBars className="bars"/>
        </button>
        
        <div className="search_box">
          <FaSearch className="search_icon"/>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header_right">

        <button className="notification">
          <FiBell className="bell"/>
        </button>


      </div>
    </div>
  );
}
export default Header;


 

