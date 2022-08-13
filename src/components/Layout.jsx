import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SpotifyPlayer from "./SpotifyPlayer";

function Layout({ children }) {
  const [atBottom, setAtBottom] = React.useState(false);
  // let atBottom = false;

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex-grow font-jost">
      <Header />
      <div className="min-h-screen flex flex-col">
        <div
          className="lg:max-w-7xl lg:w-11/12 mx-auto mt-24 sm:mt-32 md:mt-40 px-2 sm:px-8 md:px-10 lg:px-0"
          onScroll={handleScroll}
        >
          {children}
        </div>
        <div
          className={`absolute w-full lg:w-9/12 lg:left-[12.5%] top-full -translate-y-full ${
            atBottom ? "" : ""
          }`}
        >
          <SpotifyPlayer />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
