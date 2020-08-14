import React from "react";
import Link from "next/link";
import Layout from "../components/Layout.tsx";

export default function ErrorMSg() {
  return (
    <Layout>
      <div style={{ padding: "2rem", margin: "1rem auto " }}>
        <p style={{ textAlign: "center" }}>
          404...Not found.... Return{" "}
          <Link href="/">
            <a>Home</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
