import React from "react";
import axios from "axios";
import Layout from "../components/Layout";
import ShowLoanees from "../components/loanees";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, CircularProgress, Divider } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    padding: ".5rem",
    margin: ".5rem"
  }
});

export default function ThisWeek(): React.ReactNode {
  const [data, setData] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const classes = useStyles();
  const fetchData = async (): Promise<void> => {
    setSpinner(true);
    try {
      let { data, statusText } = await axios.get(
        "./server/routes.php?fetchthisweek=true"
      );
      if (!data) throw new Error(statusText);
      setSpinner(false);
      setData(data);
    } catch (error) {
      setSpinner(false);
      console.log("today", error.message);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout totalPosts={data.length}>
      <Grid>
        <Typography align="center" className={classes.title}>
          This week
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
          <Typography align="center" className={classes.title}>
            There are no results
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
