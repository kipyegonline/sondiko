import React, { FormEvent } from "react";
import Link from "next/link";
import { makestyles, makeStyles } from "@material-ui/styles";
import axios from "axios";
import {
  Grid,
  Button,
  Card,
  Paper,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  IconButton,
  Divider
} from "@material-ui/core";

import Layout from "../components/Layout";
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

  const classes = useStyles();

  const getLogins = (name: string, value: string): void => {
    const setState = eval("set" + name);
    setState(value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(email, password);
    if (!email && !password) {
      showError("Enter email and password.");
    } else if (!email || email.trimRight().length < 10) {
      showError("Enter email");
    } else if (!password || password.trimRight().length < 6) {
      showError("Enter password");
    } else {
      showError("Fuck you");
    }
  };
  return (
    <Grid className="container">
      <form onSubmit={handleSubmit}>
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
            <FormHelperText error>{errmsg}</FormHelperText>
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
}
