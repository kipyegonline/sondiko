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
import Pagination from "@material-ui/lab/Pagination";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  const perpage = data.length > 10 ? 10 : data.length;
  const pages = Math.ceil(data.length / perpage);

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
    if (!!select.trim()) {
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
        .catch((error) => console.error("date", error.message));
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
        .catch((error) => console.error("date", error.message));
    }
  };
  const onChangePage = (e, p) => {
    setCurrent(p - 1);
  };

  React.useEffect(() => {
    //let data = globalThis && JSON.parse(localStorage.getItem("sondikoList"));
    let auth = globalThis && JSON.parse(localStorage.getItem("sondiko"));
    //setTimeout(() => setData(data), 3000);
    if (auth) {
      Promise.all([getUsers(), getData()]);
    }
  }, []);

  return (
    <Layout totalPosts={data.length}>
      <Grid container className={classes.grid}>
        <Grid item lg={4} xs={12} md={4} className={classes.grids}>
          <FormControl className={classes.formControl}>
            <Input
              type="search"
              ref={searchRef}
              placeholder="Search person,number or Id"
              style={{ padding: ".15rem", margin: ".12rem" }}
              label="Search...."
              onKeyPress={(e) => e.key === "Enter" && fetchSelected(searched)}
              onChange={(e) => setSearched(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    size="large"
                    style={{ cursor: "pointer" }}
                    onClick={() => fetchSelected(searched)}
                  />
                </InputAdornment>
              }
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
              <ShowLoanees data={data.slice(start, end)} start={start} />
              <Pagination
                count={pages}
                defaultPage={current + 1}
                page={current + 1}
                color="primary"
                onChange={onChangePage}
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
    margin: ".35rem 0"
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
    width: "70%",
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

// cv

const skills = [
  {
    language: "JavaScript",
    libraries: [
      "React js",
      "jQuery",
      "Redux",
      "Next Js",
      "TypeScript",
      "D3 js",
      "CSS in JS",
      "Unit Testing (jest,Enzyme and Cypress)"
    ]
  },
  { language: "Python", libraries: ["Python", "Pandas"] },
  { language: "PHP", libraries: ["PHP core", "MySql"] },
  {
    language: "C#",
    libraries: [
      "I am currently learning C#, static and strongly typed object oriented language "
    ]
  }
];

console.log(
  "%cHello there, \n why are you here? \n Anyway, my name is Vincent Kipyegon, a front end react web developer with over 3 years of experience. I enjoy building interfaces with javascript,backend stuff with php and Mysql and data analysis with python. \n \
    Get in touch %cvincekipyegon11@gmail.com",
  "font-family:cursive;font-size:1rem;",
  "font-weight:bold; font-family:cursive;font-size:1rem;"
);
for (let i = 0; i < skills.length; i++) {
  console.log(
    `%c${skills[i].language} \n `,
    "font-weight:bold; font-size:1rem;border-bottom:1px solid purple; color:purple; font-family:cursive;"
  );
  let lib = skills[i].libraries;
  //console.table(lib);
  //libraries
  for (let j = 0; j < lib.length; j++) {
    if (j < 1) {
      console.log(
        "%cLibrarie(s): ",
        "font-style:italic; font-weight:bold; margin-left:.35rem"
      );
    }

    console.log(`%c${j + 1}. ${lib[j]}`, "margin-left:.5rem");
  }
  //css frameworks
}
