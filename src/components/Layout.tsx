import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Grid, Typography, Divider } from "@material-ui/core";
import Nav from "./nav";

type Props = {
  children: React.ReactNode;
  totalPosts: number;
};
const useAuth = () => JSON.parse(localStorage.getItem("sondiko"));
export default function Layout({ children, totalPosts }: Props): JSX.Element {
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
      <Nav totalPosts={totalPosts} />
      <section style={{ height: "100%" }}>{children}</section>
      <Divider style={{ margin: "5rem 0 0 0" }} />

      <Typography
        variant="h6"
        align="center"
        style={{
          background: "purple",
          padding: ".85rem",
          margin: "1.5rem auto 0",
          color: "white",
          lineHeight: "1em",
          width: "98%",
          position: "absolute",
          left: 0,
          bottom: 0
        }}
      >
        Copyright &copy; {new Date().getFullYear()}. Sondiko Investments
        Limited. All rights reserved.
      </Typography>

      <style jsx>
        {`
          .footer {
            background: purple;
          }
        `}
      </style>
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
            margin: 1rem auto 0;
            border-radius: 5px;
            height: auto;
            position: relative;
            max-height: 2000px;
          }
        `}
      </style>
    </>
  );

  if (auth) {
    return Layout;
  } else {
    if (globalThis.Window) Router.push("/signup");
    return <SSRLayout />;
  }
}

const SSRLayout = (): JSX.Element => {
  return (
    <Grid>
      <Head>
        <meta charSet="utf-8" />
        <title>Sondiko Investments.</title>
      </Head>
      <p>Redirecting....</p>
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
    </Grid>
  );
};
