import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import './App.css'

const App: React.FC = () => {
  //TODO: conditional rendering
  return (
    <>
      <div className="h-screen w-screen"><Outlet /></div>
      {/* <div className="fixed w-full bottom-0 p-3"><Navbar/></div> */}
    </>
  );
};

export default App;
