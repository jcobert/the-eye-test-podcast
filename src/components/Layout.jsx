import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="flex-grow">
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="lg:max-w-7xl lg:w-11/12 mx-auto mt-24 sm:mt-32 md:mt-40 px-2 sm:px-8 md:px-10 lg:px-0">
          {children}
        </div>
      </div>
      {/* footer */}
    </div>
  );
}

export default Layout;
