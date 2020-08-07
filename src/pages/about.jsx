import React from "react";
import {
  Input,
  FormControl,
  Avatar,
  InputLabel,
  IconButton
} from "@material-ui/core";
export default function About() {
  const [avatar, setAvatar] = React.useState("");

  const handleFile = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      formData.append("ava", file, file);
    }
    console.log(formData, "dara");
  };
  return (
    <div className="form-data">
      <p>About us</p>
      <div>
        <Avatar src={avatar} alt="pic" style={{ width: 200, height: 200 }} />
      </div>

      <FormControl>
        <Input type="file" onChange={handleFile} />
      </FormControl>
      <style jsx>{`
        .form-data {
          margin: 1rem auto;
          width: 300px;
          background: white;
          padding: 2rem;

          border: 1px solid red;
        }
        .form-data :hover {
          transform: rotate(-15deg);
          background: purple;
        }
      `}</style>
    </div>
  );
}
