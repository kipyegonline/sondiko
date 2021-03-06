import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { LoanForm } from "../components/loanForm";
import Layout from "../components/Layout";

const useStyles = makeStyles({
  grid: { maxWidth: 1000 }
});

function Sondiko(): React.ReactNode {
  const classes = useStyles();

  return (
    <Layout totalPosts={0}>
      <Grid className={classes.grid}>
        <Grid>
          <LoanForm />
        </Grid>
      </Grid>
    </Layout>
  );
}
export default Sondiko;

// redux
type AppState = {};
type Action =
  | { type: "SET_ONE"; payload: string }
  | { type: "SET_TWO"; payload: number };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_ONE":
      return {
        ...state,
        one: action.payload // `payload` is string
      };
    case "SET_TWO":
      return {
        ...state,
        two: action.payload // `payload` is number
      };
    default:
      return state;
  }
}
