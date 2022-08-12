import "./src/styles/global.css";
import React from "react";
import Layout from "./src/components/Layout";
import { Script } from "gatsby";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}<Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" /></Layout>;
};
