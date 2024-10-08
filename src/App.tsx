import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";

const App: React.FC = () => {
  //TODO: conditional rendering
  return (
    <>
      <div><Outlet /></div>
      <div className="fixed w-full bottom-0 p-3"><Navbar/></div>
    </>
  );
};

export default App;
