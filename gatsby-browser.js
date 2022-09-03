import "./src/styles/global.css";
import React from "react";
import Layout from "./src/components/Layout";
// import { Script } from "gatsby";
import GlobalContextProvider from "./src/context/GlobalContextProvider";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
