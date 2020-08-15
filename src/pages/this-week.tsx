import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, CircularProgress, Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Layout from "../components/Layout";
import ShowLoanees from "../components/loanees";

const useStyles = makeStyles({
  title: {
    padding: ".5rem",
    margin: ".5rem"
  }
});

export default function ThisWeek(): React.ReactNode {
  const [data, setData] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const classes = useStyles();
  const perpage = data.length > 10 ? 10 : data.length;
  const pages = Math.ceil(data.length / perpage);

  const start = current * perpage;
  const end = current * perpage + perpage;
  const onChangePage = (e: React.ChangeEvent, p: number) => {
    e.preventDefault();
    setCurrent(p - 1);
  };
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
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout totalPosts={data.length}>
      <Grid style={{ height: "100%" }}>
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
            <ShowLoanees data={data.slice(start, end)} start={start} />
            {data.length > 10 ? (
              <Pagination
                count={pages}
                defaultPage={current + 1}
                page={current + 1}
                color="primary"
                onChange={onChangePage}
              />
            ) : null}
          </>
        ) : spinner ? (
          <Typography align="center" className={classes.title}>
            <CircularProgress />
          </Typography>
        ) : (
          <Typography align="center" className={classes.title}>
            There are no results for this week...
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
