import React from "react";
import axios, { AxiosResponse } from "axios";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
//import InputAdornment from "@material-ui/core/InputAdornment";
import {
  Grid,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Box,
  Button,
  CircularProgress
} from "@material-ui/core";
//import Account from "@material-ui/icons/AccountBox";

const useStyles = makeStyles({
  formControl: {
    margin: "0.75rem .15rem",
    width: "100%",

    padding: ".25rem"
  },
  grid: {
    margin: "0 .75rem .25rem .75rem"
  },
  formTitle: {
    textAlign: "center",
    padding: ".5rem .75rem",
    borderBottom: "1px purple solid"
  },
  asset: {
    margin: ".5rem .35rem",
    width: "100%",
    "@media": {
      margin: ".5rem 0"
    }
  },
  submit: {
    margin: ".5rem .35rem"
  }
});
type Input = {
  name: string;
  value: string;
};
type Props = {
  sendValue: (name: string, value: string) => void;
  name: string;
  type: string;
  label: string;
};
type Assets = {
  model: string;
  value: string;
  asset: string;
  clientServer: number;
};
interface userData {
  clientName: string;
  clientId: string;
  clientPhone: string;
  date: string;
  amount: string;
  returnDate: string;
  subCounty: string;
  location: string;
  subLocation: string;
  village: string;

  item?: string;
  addedBy: string;
}
interface Response extends AxiosResponse {
  username: string;
  status: number;
  statusText: string;
  id?: string;
}
interface Clear {
  clearFields: () => void;
  clientServer: number;
  clientName: string;
}

export const LoanForm: React.FC<{}> = () => {
  const classes = useStyles();
  const [clientName, setClientName] = React.useState<string>("");
  const [clientId, setClientId] = React.useState<string>("");
  const [clientPhone, setClientPhone] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [returnDate, setReturnDate] = React.useState<string>("");
  const [subCounty, setSubCounty] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [subLocation, setSubLocation] = React.useState<string>("");
  const [village, setVillage] = React.useState<string>("");

  const [spinner, setSpinner] = React.useState<boolean>(false);
  const [errinf, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  const [clientServer, setClientServer] = React.useState(0);
  const form = React.useRef<HTMLFormElement>(null!);

  const getValue = (name: string, value: string) => {
    let setState = eval("set" + name);
    setState(value);
  };

  const clearFields = (): void => {
    // reset

    setClientId("");
    setClientName("");
    setClientPhone("");
    setAmount("");
    setDate("");
    setReturnDate("");
    setSubCounty("");
    setLocation("");
    setSubLocation("");
    setVillage("");
    setClientServer(0);
    setSuccess("");
  };
  //form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void | null => {
    e.preventDefault();
    const uuid = JSON.parse(localStorage.getItem("sondiko"));
    if (!uuid) {
      setError("Please login to perform this operation");
      setTimeout(() => setError(""), 3000);
    } else if (clientName.indexOf(" ") < 0 || clientName.trim().length < 6) {
      clientName.trim().length < 6
        ? setError("Enter name on number 1")
        : setError("Enter second name on number 1");
      setTimeout(() => setError(""), 3000);
    } else if (clientId.trim().length < 6) {
      setError("Enter national id number on number 2");
      setTimeout(() => setError(""), 3000);
    } else if (clientPhone.trim().length < 1) {
      setError("Enter phone number on number 3");
      setTimeout(() => setError(""), 3000);
    } else if (date.trim().length < 10) {
      setError("Enter date on number 4");
      setTimeout(() => setError(""), 3000);
    } else if (amount.trim().length < 1) {
      setError("How much was borrowed on number 5?");
      setTimeout(() => setError(""), 3000);
    } else if (returnDate.trim().length < 10) {
      setError("Enter loan repayment date on number 6");
      setTimeout(() => setError(""), 3000);
    } else if (subCounty.trim().length < 1) {
      setError("Enter district on number 7");
      setTimeout(() => setError(""), 3000);
    } else if (location.trim().length < 1) {
      setError("Enter location on number 8");
      setTimeout(() => setError(""), 3000);
    } else if (subLocation.trim().length < 1) {
      setError("Enter sub location on number 9");
      setTimeout(() => setError(""), 3000);
    } else if (village.trim().length < 1) {
      setError("Enter village on number 10");
      setTimeout(() => setError(""), 3000);
    } else if (
      clientName.length > 6 &&
      clientId.length > 5 &&
      clientPhone.length > 0 &&
      date.length > 9 &&
      amount.length > 0 &&
      returnDate.length > 9 &&
      subCounty.length > 0 &&
      location.length > 0 &&
      subLocation.length > 0 &&
      village.length > 0
    ) {
      // send to server

      setError("");
      setSpinner(true);
      const data: userData = {
        clientName,
        clientId,
        clientPhone,
        date,
        amount,
        returnDate,
        subCounty,
        location,
        subLocation,
        village,
        addedBy: uuid.username || "admin"
      };
      // useLocalStore(data);
      axios
        .post("./server/routes.php?addloans=true", data)
        .then((res: Response) => {
          const { data } = res;

          if (data.status === 200) {
            // setClientServer(+data.id);
            setTimeout(() => {
              setClientServer(+data.id);
              setSpinner(false);
              form.current.reset();
            }, 1000);
          } else {
            throw new Error(res.data.statusText);
          }
        })
        .catch((error) => {
          console.log("Error stat", error);
          setError(error.message);
          setSpinner(false);
          setTimeout(() => setError(""), 3000);
        });
    } else {
      setError("Error information...Try again later.");

      setTimeout(() => setError(""), 3000);
    }
  };

  const Loans = (
    <Grid>
      <form onSubmit={handleSubmit} ref={form}>
        <Typography variant="h5" className={classes.formTitle}>
          Add Loan details
        </Typography>
        <Grid container alignItems="flex-start" justify="flex-start">
          <Grid item xs={12} lg={4} md={4} className={classes.grid}>
            <Typography variant="body1" className="assets">
              Bio data
            </Typography>
            <TextInput
              sendValue={getValue}
              type="text"
              name="ClientName"
              label="1. Client Name"
            />
            <TextInput
              sendValue={getValue}
              type="number"
              name="ClientId"
              label="2. Id number"
            />{" "}
            <TextInput
              sendValue={getValue}
              type="telephone"
              name="ClientPhone"
              label="3. Mobile/Telephonee"
            />{" "}
            <span>4. Date</span>
            <TextInput
              sendValue={getValue}
              type="date"
              name="Date"
              label=""
            />{" "}
            <TextInput
              sendValue={getValue}
              type="number"
              name="Amount"
              label="5. Amount borrowed"
            />{" "}
          </Grid>
          <Divider orientation="vertical" />
          <Grid item xs={12} lg={4} md={4} className={classes.grid}>
            <Typography variant="body1" className="assets">
              Location
            </Typography>
            <span>6. Return Date</span>
            <TextInput
              sendValue={getValue}
              type="date"
              name="ReturnDate"
              label=""
            />{" "}
            <TextInput
              sendValue={getValue}
              type="text"
              name="SubCounty"
              label="7. Sub county"
            />{" "}
            <TextInput
              sendValue={getValue}
              type="text"
              name="Location"
              label="8. Location"
            />{" "}
            <TextInput
              sendValue={getValue}
              type="text"
              name="SubLocation"
              label="9. Sub location"
            />{" "}
            <TextInput
              sendValue={getValue}
              type="text"
              name="Village"
              label="10. Village"
            />{" "}
            <Box>
              <FormHelperText className="text-center" error>
                {errinf}
              </FormHelperText>
              <FormHelperText className="text-center" error>
                {""}
              </FormHelperText>
              {spinner ? (
                <CircularProgress
                  size={30}
                  thickness={3}
                  className="text-center"
                  color="primary"
                />
              ) : null}
            </Box>
            <Button
              type="submit"
              className={classes.submit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={spinner}
            >
              Submit
            </Button>
            <Snackbar
              open={success.length ? true : false}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert severity="success">{success}</Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </form>
      <style>{`
        .assets {
          margin: 0.5rem;
          padding: 0.5rem;
          line-height: 1em;
          text-align: center;
        }
        .text-center{
          text-align:center;
          margin:.25rem auto;
        }
      `}</style>
    </Grid>
  );
  return !!!clientServer ? (
    Loans
  ) : (
    <AssetsForm
      clearFields={clearFields}
      clientServer={clientServer}
      clientName={clientName}
    />
  );
};

const AssetsForm = ({
  clearFields,
  clientServer,
  clientName
}: Clear): JSX.Element => {
  const [asset, setAssetName] = React.useState<string>("");
  const [model, setAssetModel] = React.useState<string>("");
  const [value, setAssetValue] = React.useState<string>("");
  const [spinner, setSpinner] = React.useState<boolean>(false);
  const [errinf, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const classes = useStyles();
  //get added assets
  const getAsset = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let target = e.target as HTMLInputElement;
    let setState = eval("set" + target.name);
    setState(target.value);
  };
  const handleSubmit = () => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      setSuccess("Details added successfully");
      setTimeout(() => {
        setSuccess("");
        clearFields();
      }, 300);
    }, 2000);
  };
  const getEl = (el: string): HTMLInputElement =>
    document.getElementById(el) as HTMLInputElement;
  // put assets into array
  const handleAssets = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (asset && +clientServer > 0) {
      e.preventDefault();

      const userAssets: Assets = {
        asset,
        model,
        value,
        clientServer
      };
      // posts assets to server
      axios
        .post("./server/routes.php?addassets=true", userAssets)
        .then((res) => {
          const { data } = res;
          if (data.status === 200) {
            setSuccess(data.statusText);
            setAssetName("");
            setAssetModel("");
            setAssetValue("");

            //clear  input
            getEl("assetName").value = "";
            getEl("assetModel").value = "";
            getEl("assetValue").value = "";
            setTimeout(() => setSuccess(""), 2000);
          } else {
            throw new Error(data.statusText);
          }
        })
        .catch((error) => {
          console.log("asset error");
          setError(error.message);
          setTimeout(() => setError(""), 3000);
        });
    } else {
      throw new Error("Unknown user");
    }
  };
  return (
    <Box style={{ width: 300, margin: "auto", padding: "1rem" }}>
      <Typography variant="body1" className="assets">
        Assets for {clientName}
      </Typography>
      <FormHelperText>Assets...</FormHelperText>
      <TextField
        onChange={getAsset}
        name="AssetName"
        className={classes.asset}
        variant="filled"
        id="assetName"
        label="Asset Name"
      />{" "}
      <TextField
        onChange={getAsset}
        type="text"
        className={classes.asset}
        name="AssetModel"
        id="assetModel"
        variant="filled"
        label="Model/Color"
      />
      <TextField
        onChange={getAsset}
        type="text"
        className={classes.asset}
        name="AssetValue"
        id="assetValue"
        variant="filled"
        label="Value"
      />
      <Box>
        <FormHelperText error>{errinf}</FormHelperText>
        <Snackbar open={!!success} />
        <Alert severity="success">{success}</Alert>
      </Box>
      <Button
        color="secondary"
        onClick={handleAssets}
        variant="outlined"
        size="small"
      >
        Add Asset
      </Button>
      <Snackbar open={!!success} message={success} />
      <Button
        color="primary"
        variant="contained"
        size="large"
        disabled={spinner}
        onClick={handleSubmit}
      >
        Submit All
      </Button>
      {spinner ? <CircularProgress size={30} /> : null}
    </Box>
  );
};

export const TextInput: React.FC<Props> = ({
  sendValue,
  type,
  name,
  label
}) => {
  const [errorInf, setError] = React.useState<boolean>(false);
  const classes = useStyles();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    let target = e.target as HTMLInputElement;

    sendValue(target.name, target.value);
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    let target = e.target as HTMLInputElement;

    if (!target.value.length) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Input
        type={type}
        name={name}
        onChange={handleChange}
        error={errorInf}
        onBlur={handleBlur}
      />
    </FormControl>
  );
};

/*
const useLocalStore = (data: userData) => {
  let list = globalThis && JSON.parse(localStorage.getItem("sondikoList"));
  if (list) {
    list = [...list, data];
    localStorage.setItem("sondikoList", JSON.stringify(list));
  } else {
    localStorage.setItem("sondikoList", JSON.stringify([data]));
  }
};
*/
