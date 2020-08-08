import React, { FormEvent } from "react";
import { makestyles, makeStyles } from "@material-ui/styles";
import Link from "next/link";
import axios from "axios";
import {
  Grid,
  Button,
  Box,
  Card,
  Paper,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  Divider,
  Typography
} from "@material-ui/core";
import Layout from "../components/Layout";
import { TextInput } from "../components/loanForm";

export default function SignUp(): React.ReactNode {
  const getInfo = () => {};
  return (
    <Grid className="container">
      <Card className="card" elevation={5}>
        <CardHeader
          title={<Typography variant="h6">Sondiko sign up</Typography>}
          className="title"
        />
        <Divider />
        <CardContent>
          <TextInput
            type="text"
            name="Username"
            label="Username"
            sendValue={getInfo}
          />
          <TextInput
            type="email"
            name="Email"
            label="Email address"
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
        </CardContent>
        <CardActions>
          <Button color="primary" className="btn" variant="contained">
            Sign Up
          </Button>
        </CardActions>
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
