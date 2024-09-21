import React from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  //TODO: conditional rendering
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
