import React from "react";
import Head from "next/head";
import Router from "next/router";
//import Nav from "./nav";

type Props = {
  children: React.ReactNode;
};
const useAuth = () => JSON.parse(localStorage.getItem("sondiko"));
export default function Layout({ children }: Props): JSX.Element {
  let auth;
  if (globalThis.Window) {
    console.log("window", globalThis.Window);
    auth = useAuth();
  }

  const Layout = (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Sondiko Investments.</title>
      </Head>

      {children}
      <style global jsx>
        {`
          html {
            background: #ccc;
          }
          body {
            width: 80%;
            padding: 1rem;
            background: #fff;
            font-family: roboto;
            font-size: 1rem;
            margin: 5rem auto;
            border: 1px solid red;
          }
        `}
      </style>
    </div>
  );
  if (auth) {
    return Layout;
  } else {
    if (globalThis.Window) Router.push("login");
    return <p>Redirecting...</p>;
  }
}
