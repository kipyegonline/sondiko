import React, { FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { makeStyles } from "@material-ui/styles";

import {
  Grid,
  Button,
  Card,
  CardActions,
  Box,
  CardContent,
  CardHeader,
  FormHelperText,
  LinearProgress,
  Divider
} from "@material-ui/core";

//import Layout from "../components/Layout";
import { TextInput } from "../components/loanForm";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: "auto",
    padding: "1rem"
  }
});

export default function Login(): React.ReactNode {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errmsg, showError] = React.useState<string>("");
  const [spinner, setSpinner] = React.useState<boolean>(false);
  const form = React.useRef<HTMLFormElement>(null!);

  const classes = useStyles();

  const getLogins = (name: string, value: string): void => {
    const setState = eval("set" + name);
    setState(value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(email, password);
    if (!email.trim().length && !password.trim().length) {
      showError("Enter email and password.");
      setTimeout(() => showError(""), 3000);
    } else if (!email.trim().length || email.trimRight().length < 10) {
      showError("Enter email");
      setTimeout(() => showError(""), 3000);
    } else if (!password || password.trimRight().length < 6) {
      password.trimRight().length < 1
        ? showError("Enter  password")
        : showError("Enter a valid password");
      setTimeout(() => showError(""), 3000);
    } else if (email.trim().length > 8 && password.trim().length > 5) {
      showError("");
      setSpinner(true);
      let formData: FormData = new FormData();
      formData.append("useremail", email);
      formData.append("userpassword", password);
      axios
        .post("./server/routes.php?login=true", { email, password })
        .then((res) => {
          setSpinner(false);
          console.log(res);
          if (res.data.status === 200) {
            localStorage.setItem("sondiko", JSON.stringify(res.data));

            Router.push("sondiko");
            setTimeout(() => {
              setEmail("");
              setPassword("");
              //form.current.reset();
            }, 3000);
          } else {
            let msg = res.data.statusText;
            throw new Error(msg);
          }
        })
        .catch((error) => {
          setSpinner(false);
          showError(error.message);
          console.log("login Error", error.message);
          setTimeout(() => showError(""), 3000);
        });
    } else {
      showError("Error Try again later");
      setTimeout(() => showError(""), 5000);
    }
  };
  React.useEffect(() => {
    const uuid = () =>
      globalThis.window && JSON.parse(localStorage.getItem("sondiko"));
    if (uuid()) {
      Router.push("/");
    }
  }, []);

  const Login = (
    <Grid className="container">
      <form onSubmit={handleSubmit} ref={form}>
        <Card className={classes.card} elevation={10}>
          <CardHeader title="Sondiko Login" className="title" />
          <Divider />

          <CardContent>
            <TextInput
              type="email"
              name="Email"
              label="Email address"
              sendValue={getLogins}
            />
            <TextInput
              type="password"
              name="Password"
              label="Password"
              sendValue={getLogins}
            />
            <FormHelperText error className="title">
              {errmsg}
            </FormHelperText>
            <Box>{spinner ? <LinearProgress /> : null}</Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              className="login-btn"
              color="primary"
            >
              Login
            </Button>
          </CardActions>
          <p className="title-p">
            <Link href="/signup">
              <a className="link">Sign up</a>
            </Link>
          </p>
        </Card>
      </form>
      <style>
        {`
         .container{         
          padding:1rem;
          background:#ccc;
          font-size:1.25rem;
          font-family:roboto;
          height:100vh;
      }
          .title {
            text-align: center;
          }
          .login-btn {
            width: 100%;
          }
          .link{
         text-decoration:none;
         text-align:center;
         line-spacing:5px;
         color:inherit;
         font-size:1.3rem;
         padding:.5rem;
     }
          .title-p{
         margin:0;
         text-align:center;
     }
        `}
      </style>
    </Grid>
  );
  return Login;
}
