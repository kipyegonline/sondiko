import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Divider,
  TablePagination
} from "@material-ui/core";
import Layout from "../components/Layout.tsx";
import ShowLoanees from "../components/loanees.tsx";
function App() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const [searched, setSearched] = React.useState("");
  const [date, setDate] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);
  const classes = useStyles();
  const [current, setCurrent] = React.useState(0);
  const searchRef = React.useRef(null);
  const perpage = 10;
  const pages = data.length > perpage ? Math.ceil(data.length / perpage) : 0;

  const start = current * perpage;
  const end = current * perpage + perpage;
  //get data
  const getData = async () => {
    setSpinner(true);
    try {
      let { data, status, statusText } = await axios.get(
        "./server/routes.php?getLoanees=true"
      );

      if (data) {
        setSpinner(false);
        setData(data);
      } else {
        throw new Error(statusText);
      }
    } catch (error) {
      setSpinner(false);
      setError(error.message);
      console.log(error.message);
    }
  };
  //get  users
  const getUsers = async () => {
    try {
      let { data, status, statusText } = await axios.get(
        "./server/routes.php?getusers=true"
      );

      if (data) {
        setUsers(data);
      }
    } catch (error) {
      setError(statusText);
      console.log(error.message);
    }
  };
  //search
  const fetchSelected = (select) => {
    if (select.trim()) {
      setSpinner(true);
      axios
        .get(`./server/routes.php?selectedsearch=true&selected=${select}`)
        .then((res) => {
          const { data } = res;
          if (!data) throw new Error(res.statusText);
          return setData(data);
        })
        .catch((error) => console.error("search", error.message))
        .finally(() => {
          setSearched("");
          searchRef.current.value = "";
          setSpinner(false);
        });
    }
  };
  // date picker
  const handleDateSearch = (e) => {
    if (e.target.value) {
      setDate(e.target.value);
      axios
        .get(`./server/routes.php?datesearch=true&date=${e.target.value}`)
        .then((res) => {
          const { data } = res;

          if (!data) throw new Error(res.statusText);
          return setData(data);
        })
        .catch((error) => console.error("date", error.message))
        .finally(() => console.log("Finally date"));
    }
  };
  // select
  const handleSelect = (e) => {
    if (e.target.value) {
      setSelected(e.target.value);
      axios
        .get(`./server/routes.php?handleselect=true&selected=${e.target.value}`)
        .then((res) => {
          const { data } = res;
          if (!data) throw new Error(res.data);
          return setData(data);
        })
        .catch((error) => console.error("date", error.message))
        .finally(() => console.log("Finally select"));
    }
  };
  const onChangePage = (e, p) => {
    console.log("page on", e, p);
  };
  const handleChange = (e, p) => {
    console.log("pageeee", e, p);
  };
  React.useEffect(() => {
    let data = globalThis && JSON.parse(localStorage.getItem("sondikoList"));
    let auth = globalThis && JSON.parse(localStorage.getItem("sondiko"));
    setTimeout(() => setData(data), 3000);
    if (auth) {
      Promise.all([getUsers(), getData()]);
    }
  }, []);
  console.log("pages", pages);
  return (
    <Layout>
      <Grid container className={classes.grid}>
        <Grid item lg={4} xs={12} md={4} className={classes.grids}>
          <FormControl className={classes.formControl}>
            <TextField
              type="search"
              ref={searchRef}
              style={{ padding: ".15rem", margin: ".12rem" }}
              label="Search...."
              onBlur={() => fetchSelected(searched)}
              onChange={(e) => setSearched(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={12} md={4} className={classes.grids}>
          <FormControl className={classes.formControl}>
            <TextField
              type="date"
              style={{ padding: ".15rem", margin: ".15rem" }}
              onChange={handleDateSearch}
            />
            <FormHelperText>View By dates: {date}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={12} md={4} className={classes.grids}>
          <FormControl className={classes.formControl}>
            <Select
              variant="filled"
              label="See who posted the info"
              value={selected}
              style={{ padding: ".15rem", margin: ".12rem" }}
              onChange={handleSelect}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.user}>
                  {user.user}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              View who added : <b>{selected} </b>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.grids}
      >
        <Grid item xs={12} md={12} lg={12}>
          {" "}
          <Typography align="center">
            {!!data.length ? data.length : ""}{" "}
            {data.length < 1 ? "" : data.length > 1 ? "people" : "person"}
          </Typography>
          <Divider />
          {!!data.length ? (
            <>
              <ShowLoanees data={data.slice(start, end)} />
              <TablePagination
                count={pages}
                nextIconButton={"next"}
                rowsPerPage={perpage}
                page={current}
                onChangePage={onChangePage}
              />
            </>
          ) : spinner ? (
            <Typography align="center">
              {" "}
              <CircularProgress size={55} thickness={3} />
            </Typography>
          ) : (
            <Typography variant="body2">{error}</Typography>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
export default App;

const useStyles = makeStyles({
  grid: {
    padding: ".5rem",
    margin: ".35rem 0",
    border: "1px solid red"
  },
  grids: {
    "@media (max-width:480px)": {
      margin: ".15rem auto",
      padding: ".15rem",
      width: "100%"
    },
    "@media (min-width:768px)": {
      margin: ".5rem auto",
      padding: ".5rem",
      width: "100%"
    }
  },
  formControl: {
    width: "80%",
    margin: " 0.5rem auto",
    padding: ".5rem",
    "@media (max-width:480px)": {
      margin: ".25rem auto",
      padding: ".25rem",
      background: "white",
      width: "100%"
    },
    "@media (min-width:768px)": {
      margin: ".25rem auto",
      padding: ".25rem",

      width: "100%"
    }
  }
});
