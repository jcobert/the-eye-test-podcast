import React from "react";
import Layout from "./src/components/Layout";
import GlobalContextProvider from "./src/context/GlobalContextProvider";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="jost"
      rel="preload"
      href="/fonts/Jost-VariableFont_wght.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="optician"
      rel="preload"
      href="/fonts/Optiker-K.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="optician"
      rel="preload"
      href="/fonts/Optiker-K.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
    />,
  ]);
};

export const wrapRootElement = ({ element, props }) => {
  return <GlobalContextProvider><Layout {...props}>{element}</Layout></GlobalContextProvider>;
};
