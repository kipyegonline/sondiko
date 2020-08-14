import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import Home from "@material-ui/icons/Home";
import Form from "@material-ui/icons/Info";
import Today from "@material-ui/icons/Today";
import Week from "@material-ui/icons/NextWeek";
import { Button } from "@material-ui/core";

import LogOut from "@material-ui/icons/ExitToApp";
import { Link as MLink } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: "none",
      "@media (max-width:480px)": {
        display: "block",
        width: "100%"
      }
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    mmenu: {
      width: "100%",
      maxWidth: 480,
      background: "red"
    },
    navbar: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
      "& a": {
        color: "black",
        fontSize: "1.1rem",
        display: "inline-block",
        padding: ".65rem",
        lineHeight: "1em"
      },
      "& a:hover": {
        textDecoration: "none",
        cursor: "pointer"
      },
      "@media (max-width:480px)": {
        display: "none"
      }
    },
    navbarMobile: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "100%",
      padding: "0.5rem 0",
      margin: 0,

      "& a": {
        color: "black",
        display: "block",
        fontSize: "1.1rem",
        padding: ".5rem",
        lineHeight: "1em"
      },
      "& a:hover": {
        textDecoration: "none",
        cursor: "pointer"
      }
    },

    navbarMobileTop: {
      display: "none",
      "@media (max-width:480px)": {
        display: "block",
        width: "100%"
      }
    }
  })
);

type Props = {
  totalPosts: number;
};
export default function PrimarySearchAppBar({ totalPosts = 0 }: Props) {
  const useAuth = () =>
    globalThis && JSON.parse(localStorage.getItem("sondiko"));
  let username: string | undefined | null;
  if (useAuth()) {
    username = useAuth().username;
  }
  const classes = useStyles();

  const [isOpen, setOpen] = React.useState(false);

  const handleMenuIcon = () => setOpen(!isOpen);

  const handleLogout = (): void => {
    localStorage.removeItem("sondiko");
    location.reload();
    //Router.push("/login");
  };

  const MobileMenu = (
    <div className={classes.navbarMobileTop}>
      <div>
        <IconButton
          edge="end"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          size="medium"
          onClick={handleMenuIcon}
        >
          {isOpen ? <Close /> : <MenuIcon />}
        </IconButton>
      </div>
      {isOpen ? (
        <div className={classes.navbarMobile}>
          <Typography variant="body1">
            <Link href="/">
              <MLink variant="body2">
                <IconButton>
                  <Home color="primary" />
                </IconButton>
              </MLink>
            </Link>
          </Typography>

          <Typography variant="body1">
            <Link href="/today">
              <MLink variant="body2">
                <IconButton>
                  <Today color="primary" />
                </IconButton>
                Today
              </MLink>
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link href="/this-week">
              <MLink variant="body2">
                <IconButton>
                  <Week color="primary" />
                </IconButton>
                This week
              </MLink>
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link href="/sondiko">
              <MLink variant="body2">
                <IconButton>
                  <Form color="primary" />
                </IconButton>
                Form
              </MLink>
            </Link>
          </Typography>
          <Button
            color="secondary"
            style={{ margin: ".5rem", padding: ".5rem" }}
            size="small"
            variant="outlined"
          >
            {username || "Vince"}{" "}
          </Button>

          <IconButton color="secondary" onClick={handleLogout}>
            <LogOut />
          </IconButton>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div>
            {" "}
            <Typography className={classes.title} variant="h6" noWrap>
              <Link href="/">
                <MLink variant="h5">Sondiko</MLink>
              </Link>
            </Typography>
          </div>
          <div className={classes.navbar}>
            <Typography variant="body1">
              <Link href="/">
                <MLink variant="body2">
                  <IconButton>
                    <Home color="primary" />
                  </IconButton>
                </MLink>
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/sondiko">
                <MLink variant="body2">
                  <IconButton>
                    <Form color="primary" />
                  </IconButton>
                  Form
                </MLink>
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/today">
                <MLink variant="body2">
                  <IconButton>
                    <Today color="primary" />
                  </IconButton>
                  Today
                </MLink>
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/this-week">
                <MLink variant="body2">
                  <IconButton>
                    <Week color="primary" />
                  </IconButton>
                  This week
                </MLink>
              </Link>
            </Typography>
            <Button color="secondary" size="small" variant="outlined">
              {username || ""}{" "}
            </Button>
            <IconButton color="secondary" onClick={handleLogout}>
              <LogOut />
            </IconButton>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="new notifications" color="inherit">
              <Badge badgeContent={totalPosts} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
          {/*
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          */}
          {MobileMenu}
        </Toolbar>
      </AppBar>
    </div>
  );
}
