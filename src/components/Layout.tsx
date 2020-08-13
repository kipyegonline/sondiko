import React from "react";
import Head from "next/head";
import Router from "next/router";
import Nav from "./nav";

type Props = {
  children: React.ReactNode;
};
const useAuth = () => JSON.parse(localStorage.getItem("sondiko"));
export default function Layout({ children }: Props): JSX.Element {
  let auth;
  if (globalThis.Window) {
    auth = useAuth();
  }

  const Layout = (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Sondiko Investments.</title>
      </Head>
      <Nav />

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
            margin: 1rem auto;
            border-radius: 5px;
          }
        `}
      </style>
    </>
  );

  if (auth) {
    return Layout;
  } else {
    if (globalThis.Window) Router.push("/signup");
    return <p>Redirecting</p>;
  }
}
