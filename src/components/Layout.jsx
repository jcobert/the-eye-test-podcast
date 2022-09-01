import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalPlayer from "./GlobalPlayer";

function Layout({ children }) {
  
  return (
    <div className="flex-grow font-jost bg-slate-100">
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="w-11/12 lg:max-w-7xl lg:w-11/12 mx-auto mt-24 sm:mt-32 lg:mt-32 px-2 sm:px-8 md:px-10 lg:px-0">
          {children}
        </div>
      </div>
      {/* Global Media Player */}
      <div
        className={`sticky bottom-0 mx-auto bg-[rgb(45,124,189)] border border-slate-300 h-24 w-full lg:w-8/12 lg:rounded-t-md shadow-md`}
      >
        <GlobalPlayer />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
