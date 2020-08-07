import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { LoanForm } from "../components/loanForm";
import Layout from "../components/Layout";

const useStyles = makeStyles({
  grid: { maxWidth: 1000 }
});
type Props = { handleClick(): void };

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

function Sondiko(): React.ReactNode {
  const classes = useStyles();
  const handleClick = (e: ButtonEvent): Props => {
    console.log("Btn clicked");
  };
  const getDamnValue = (name: string, value: string): void => {
    console.log(name, value);
  };

  return (
    <Layout>
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

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log(name);
};
