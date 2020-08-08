import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Divider,
  Box,
  Button
} from "@material-ui/core";
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
  asset: string;
  model: string;
  value: string;
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
  const [asset, setAssetName] = React.useState<string>("");
  const [model, setAssetModel] = React.useState<string>("");
  const [value, setAssetValue] = React.useState<string>("");
  const form = React.useRef<HTMLFormElement>(null!);

  const getValue = (name: string, value: string) => {
    let setState = eval("set" + name);
    setState(value);
    console.log(name);
  };
  const getAsset = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let target = e.target as HTMLInputElement;
    console.log(target.name, target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      asset,
      model,
      value
    };
    console.log("submit", data);
    form.current.reset();
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit} ref={form}>
        <Typography variant="h5" className={classes.formTitle}>
          Add Loan details
        </Typography>
        <Grid container alignItems="flex-start" justify="flex-start">
          <Grid item xs={12} lg={3} md={4} className={classes.grid}>
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
          <Grid item xs={12} lg={3} md={4} className={classes.grid}>
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
          </Grid>
          <Grid item xs={12} sm={12} lg={4} md={4} className={classes.grid}>
            <Typography variant="body1" className="assets">
              Assets
            </Typography>
            <TextField
              onChange={getAsset}
              name="AssetName"
              className={classes.asset}
              variant="filled"
              label="Asset Name"
            />{" "}
            <TextField
              onChange={getAsset}
              type="text"
              className={classes.asset}
              name="AssetModel"
              variant="filled"
              label="Model/Color"
            />
            <TextField
              onChange={getAsset}
              type="text"
              className={classes.asset}
              name="AssetValue"
              variant="filled"
              label="Value"
            />
            <Box>
              <FormHelperText></FormHelperText>
            </Box>
            <Button
              type="submit"
              className={classes.submit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={false}
            >
              Submit
            </Button>
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
      `}</style>
    </Grid>
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
    console.log(target.name, target.nextSibling);
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
