import React from "react";

import { Provider } from "react-redux";
import "typeface-roboto";
import "typeface-raleway";
//import store from "../redux/store";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
