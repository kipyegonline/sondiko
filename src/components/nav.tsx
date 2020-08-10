import React from "react";
import { MenuItem, Menu } from "@material-ui/core";

export default function Nav(): JSX.Element {
  return (
    <Menu open style={{ display: "flex", flexDirection: "row" }}>
      <MenuItem>Home</MenuItem>
      <MenuItem>About</MenuItem>
      <MenuItem>Services </MenuItem>
    </Menu>
  );
}
