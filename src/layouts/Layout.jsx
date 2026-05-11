import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/header";
import { useState } from "react";
function Layout() {
  const [isOpen,setIsOpen]= useState(true);

  return (
    <div style={{ display: "flex", overflow:"hidden"}}>
      {/* الشريط الجانبي */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div style={{ flex:1,display:"flex", }}>
        <Header 
         isOpen={isOpen}
         setIsOpen={setIsOpen}
        />
        <Outlet/>
      </div>
      {/* المحتوى الرئيسي */}
    </div>
  );
}

export default Layout;


