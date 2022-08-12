import "./src/styles/global.css";
import React from "react";
import { Script } from "gatsby";

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

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}<Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" /></Layout>;
};
