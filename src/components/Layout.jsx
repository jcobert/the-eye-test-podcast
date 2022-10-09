import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalPlayer from "./GlobalPlayer";

function Layout({ children }) {

  return (
    <div className="flex-grow font-jost bg-slate-100">
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="w-full max-w-layoutMax mx-auto mt-24 sm:mt-32 px-8 md:px-10 lg:px-16">
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
