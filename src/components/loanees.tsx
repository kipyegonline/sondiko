import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@material-ui/core";

type UserInfo = {
  id: string;
  index: number;
  clientName: string;
  clientPhone: string;
  amount_borrowed: string;
  date_borrowed: string;
  return_date: string;
  subcounty: string;

  clientId: string;
  location: string;
  village: string;
  addedon: string;
  addedBy: string;
};

function ShowLoanees({ data = [] }: UserInfo[] | any): React.ReactNode {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Loan</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Sub county</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Village</TableCell>
            <TableCell>Added On</TableCell>
            <TableCell>Added By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: UserInfo, i: number) => (
            <UsersTable key={item.id} {...item} index={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const UsersTable = ({
  index,
  clientName = "",
  clientPhone = "",
  amount_borrowed = "0",
  date_borrowed,
  return_date,
  subcounty,
  village,
  location,
  addedon,
  addedBy
}: UserInfo): JSX.Element => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{clientName}</TableCell>
      <TableCell>{clientPhone}</TableCell>
      <TableCell>{amount_borrowed}</TableCell>
      <TableCell>{formatDate(date_borrowed)}</TableCell>
      <TableCell>{formatDate(return_date) || ""}</TableCell>
      <TableCell>{subcounty}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{village}</TableCell>
      <TableCell>{formatDate(addedon)}</TableCell>
      <TableCell>{addedBy}</TableCell>
    </TableRow>
  );
};
export default ShowLoanees;

const formatDate = (date: string): Date | string =>
  !!date ? new Date(date).toDateString() : "";
