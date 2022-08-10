import React from "react";

function Layout({ children }) {
  return (
    <div>
      {/* header */}
      {children}
      {/* footer */}
    </div>
  );
}

export default Layout;
