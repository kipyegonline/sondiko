import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props): JSX.Element {
  return (
    <div>
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
}
