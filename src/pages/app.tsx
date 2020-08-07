import * as React from "react";
import { useRouter } from "next/router";

export default function Contact() {
  const router = useRouter();

  return (
    <div>
      <p>Rendering TSX or rather typescript...</p>
      <SayUser name={"Vince"} locale={"Litein"} age={27} />
      <style jsx global>
        {`
          html {
            box-sizing: border-box;
            background: #ccc;
          }
          body {
            width: 80%;
            margin: 1rem auto;
            padding: 1rem;
            border: 1px solid purple;
            font-family: roboto, helvetica;
            font-size: 1.25rem;
            background: #ddd;
          }
        `}
      </style>
    </div>
  );
}
type Props = { name: String; locale: String; age: number; married?: boolean };
const SayUser = ({ name, locale, age, married }: Props) => (
  <div>
    <h5>{name}</h5>
    <p>
      {locale}, {married}
    </p>
    <h6>{age}</h6>
  </div>
);
