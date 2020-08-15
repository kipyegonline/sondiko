import React from "react";
import Layout from "../components/Layout";
import ShowLoanees from "../components/loanees";
import axios from "axios";

import { makeStyles } from "@material-ui/styles";

import { Grid, Typography, CircularProgress, Divider } from "@material-ui/core";
//import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
  title: {
    padding: ".5rem",
    margin: ".5rem"
  }
});
export default function Today(): React.ReactNode {
  const [data, setData] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const classes = useStyles();

  const fetchData = async (): Promise<void> => {
    setSpinner(true);
    try {
      let { data, statusText } = await axios.get(
        "./server/routes.php?fetchtoday=true"
      );
      if (!data) throw new Error(statusText);
      setSpinner(false);
      setData(data);
    } catch (error) {
      setSpinner(false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout totalPosts={data.length}>
      <Grid style={{ height: "100%" }}>
        <Typography align="center" className={classes.title}>
          Today
        </Typography>
        <Divider />

        {!!data.length ? (
          <>
            <Typography align="center" className={classes.title}>
              {!!data.length ? data.length : ""}{" "}
              {data.length < 1 ? "" : data.length > 1 ? "people" : "person"}
            </Typography>
            <ShowLoanees data={data} start={0} />
          </>
        ) : spinner ? (
          <Typography align="center" className={classes.title}>
            <CircularProgress />
          </Typography>
        ) : (
          <Typography className={classes.title} align="center">
            There are no results today...use datepicker or search area on the
            home page
          </Typography>
        )}
        <style jsx>{`
          .today {
            padding: 0.5rem;
            margin: 0.35rem 0.25rem;
          }
        `}</style>
      </Grid>
    </Layout>
  );
}
