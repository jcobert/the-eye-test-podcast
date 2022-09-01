import "./src/styles/global.css";
import React from "react";
import Layout from "./src/components/Layout";
import { Script } from "gatsby";
import GlobalContextProvider from "./src/context/GlobalContextProvider";

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
      <Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" />
    </Layout>
  );
};

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};
