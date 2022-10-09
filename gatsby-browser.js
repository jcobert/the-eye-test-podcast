import "./src/styles/global.css";
import Layout from "./src/components/Layout";
import React from "react";
import GlobalContextProvider from "./src/context/GlobalContextProvider";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
