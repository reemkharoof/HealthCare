import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import { useState } from "react";
function Layout() {
  const [isOpen,setIsOpen]= useState(false);

  return (
    <div style={{ display: "flex", overflow:"hidden"}}>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div style={{ flex:1, }}>
        <Header 
         isOpen={isOpen}
         setIsOpen={setIsOpen}
        />
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;





