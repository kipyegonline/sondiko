import React, { FormEvent } from "react";
import axios from "axios";
//import { makestyles, makeStyles } from "@material-ui/styles";
import Link from "next/link";
import Alert from "@material-ui/lab/Alert";
import {
  Grid,
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  Divider,
  Typography,
  CircularProgress,
  Snackbar
} from "@material-ui/core";

import { TextInput } from "../components/loanForm";

enum Color {
  success = "success",
  error = "error"
} // "success" | "error"
type Snack = {
  open: boolean;
  message: string;
  severityState: Color;
};

export default function SignUp(): React.ReactNode {
  const [username, setUsername] = React.useState<string>("");
  const [useremail, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errmsg, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [confpassword, setConfPassword] = React.useState<string>("");
  const [spinner, setSpinner] = React.useState<boolean>(false);
  const form = React.useRef<HTMLFormElement>(null!);
  const btn = React.useRef<HTMLButtonElement>(null!);

  const getInfo = (name: string, value: string): void => {
    let setState = eval("set" + name);
    setState(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim().length < 5) {
      username.trim().length < 1
        ? setError("Enter a username")
        : setError("Make your username slighly longer");
      setTimeout(() => setError(""), 3000);
    } else if (useremail.trim().length < 9) {
      setError("Email address/phone number is required");
      setTimeout(() => setError(""), 3000);
    } else if (password.trim().length < 5) {
      password.length < 1
        ? setError("Enter a password")
        : setError("passsword must be atleast 6 characters long");
      setTimeout(() => setError(""), 3000);
    } else if (confpassword.trim().length < 5) {
      confpassword.length < 1
        ? setError("Confirm password")
        : setError("passsword must be atleast 6 characters long");
      setTimeout(() => setError(""), 3000);
    } else if (password.trim() !== confpassword.trim()) {
      setError("The 2 passwords do not match");
      setTimeout(() => setError(""), 3000);
    } else if (
      username.length > 4 &&
      password.length > 5 &&
      useremail.length > 8
    ) {
      setError("");
      let formData: FormData = new FormData(form.current);
      setSpinner(true);
      formData.append("username", username);
      formData.append("useremail", useremail);
      formData.append("password", password);
      axios
        .post("./server/routes.php?signup=true", {
          username,
          useremail,
          password
        })
        .then((res) => {
          setSpinner(false);
          if (res.data.status == 200) {
            setSuccess(res.data.statusText);
            setTimeout(() => {
              setUsername("");
              setConfPassword("");
              setPassword("");
              setEmail("");
              setSuccess("");
              form.current.reset();
              localStorage.removeItem("sondiko");
            }, 3000);
          } else {
            throw new Error(res.data.statusText);
          }
        })
        .catch((error) => {
          setSpinner(false);
          setError(error.message);
          setTimeout(() => setError(""), 3000);
          console.log(error.message);
        });
    } else {
      setTimeout(() => setError(""), 3000);
      setError("Error, Try again later...");
    }
  };
  return (
    <Grid className="container">
      <Card className="card" elevation={5}>
        <Typography align="center" variant="h5">
          Sondiko Investments online Portal
        </Typography>
        <Divider />
        <CardHeader
          title={
            <Typography align="center" variant="h6">
              Sondiko sign up
            </Typography>
          }
        />

        <form ref={form} onSubmit={handleSubmit}>
          <CardContent>
            <TextInput
              type="text"
              name="Username"
              label="Username"
              sendValue={getInfo}
            />
            <TextInput
              type="text"
              name="Email"
              label="Email address/Phone number"
              sendValue={getInfo}
            />
            <TextInput
              type="password"
              name="Password"
              label="Password"
              sendValue={getInfo}
            />
            <TextInput
              type="password"
              name="ConfPassword"
              label="confirm Password"
              sendValue={getInfo}
            />
            <Box>
              <FormHelperText error></FormHelperText>
              <FormHelperText></FormHelperText>
              <div className="title-p">
                {spinner ? (
                  <CircularProgress size={30} color="primary" />
                ) : null}
              </div>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              ref={btn}
              type="submit"
              disabled={spinner}
              className="btn"
              variant="contained"
            >
              Sign Up
            </Button>
          </CardActions>
        </form>

        <MainSnackBar
          open={!!success.length}
          severityState={Color.success}
          message={success}
        />
        <MainSnackBar
          open={!!errmsg}
          severityState={Color.error}
          message={errmsg}
        />

        <p className="title-p">
          {" "}
          <Link href="/login">
            <a className="link">Login</a>
          </Link>
        </p>
      </Card>
      <style>{`
      .container{         
          padding:1rem;
          background:#ccc;
          font-size:1.25rem;
          font-family:roboto;
          height:100vh;
      }
      .card{
          max-width:400px;
          margin:auto;
          padding:1rem;
      }
     .title{text-align:center;}
     .btn{
         width:100%;
         dispaly:block;
     }
     .title-p{
         margin:0;
         text-align:center;
         padding:0;
     }

     .link{
         text-decoration:none;
         text-align:center;
         line-spacing:5px;
         color:inherit;
         font-size:1.3rem;
         padding:.5rem;
     }
          
          `}</style>
    </Grid>
  );
}

const MainSnackBar = ({ open, message, severityState }: Snack) => (
  <Snackbar
    style={{ width: "100%" }}
    open={open}
    autoHideDuration={5000}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    color="primary"
  >
    <Alert severity={severityState}>{message}</Alert>
  </Snackbar>
);

interface User {
  name: string;
  age: number;
  married: boolean;
}

function checkLe<T extends User>(user: T): T {
  return user;
}
let res = checkLe({ name: "Vince", age: 22, married: false, home: "Litein" });

const frenchie = <T extends unknown>(val: T): T => val;
