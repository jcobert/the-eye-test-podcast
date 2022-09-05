import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GlobalStateContext } from "../context/GlobalContextProvider.jsx";
import GlobalPlayer from "./GlobalPlayer";

function Layout({ children }) {
  const state = useContext(GlobalStateContext);

  return (
    <div className="flex-grow font-jost bg-slate-100">
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="w-11/12 max-w-layoutMax lg:w-11/12 mx-auto mt-24 sm:mt-32 lg:mt-32 px-2 sm:px-8 md:px-10 lg:px-0">
          {children}
        </div>
      </div>
      {/* Global Media Player */}
      <GlobalPlayer />
      <Footer />
    </div>
  );
}

export default Layout;
