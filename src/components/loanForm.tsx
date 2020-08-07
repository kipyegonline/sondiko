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
  Button
} from "@material-ui/core";
const useStyles = makeStyles({
  formControl: {
    margin: "0.5rem .15rem",
    width: "100%",
    maxWidth: 300,
    padding: ".25rem"
  }
});
type Input = {
  name: string;
  value: string;
};
type Props = {
  sendValue: (name: string, value: string) => void;
};

export const LoanForm: React.FC<{}> = () => {
  const getValue = (name: string, value: string) => {
    console.log(name, value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography paragraph>Add Loan details</Typography>
      <TextInput sendValue={getValue} />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        disabled={false}
      >
        Submit
      </Button>
    </form>
  );
};

const TextInput: React.FC<Props> = ({ sendValue }) => {
  const classes = useStyles();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let target = e.target as HTMLInputElement;

    sendValue(target.name, target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Client Name</InputLabel>
      <Input name="clientName" onChange={handleChange} />
    </FormControl>
  );
};
