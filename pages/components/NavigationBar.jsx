import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import React from "react";
import { NavLink, useNavigate, } from "react-router-dom";

const PREFIX = "NavigationBar";
const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`,
  grid1: `${PREFIX}-grid1`,
  paper: `${PREFIX}-paper`,
  link: `${PREFIX}-link`,
  grid: `${PREFIX}-grid`,
  typography: `${PREFIX}-typography`,
  largeIcon: `${PREFIX}-largeIcon`,
  tooltip: `${PREFIX}-tooltip`,
  primary: `${PREFIX}-primary`,
  outline: `${PREFIX}-outline`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
  },
  [`& .${classes.grid1}`]: {
    flexGrow: 1
  },
  [`& .${classes.paper}`]: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  [`& .${classes.link}`]: {
    textDecoration: "initial"
  },
  [`& .${classes.grid}`]: {
    "&:hover": {
      backgroundColor: "#F4E4C1",
      color: "#E4C580"
    }
  },
  [`& .${classes.typography}`]: {
    padding: 20
  },
  [`& .${classes.largeIcon}`]: {
    width: 60,
    height: 60,
    fontSize: 25
  },
  [`& .${classes.tooltip}`]: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    maxWidth: "none"
  },
  [`& .${classes.primary}`]: {
    fontSize: 14
  },
  [`& .${classes.outline}`]: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    maxWidth: "none"
  }
}));

const NavigationBar = () => {

  const storedCompanyNames = localStorage.getItem("companyNames");
  const [companyNames, setCompanyNames] = useState(storedCompanyNames === null || storedCompanyNames === undefined ? [] : storedCompanyNames);
  const [selectedCompany, setSelectedCompany] = useState("");

  const { navigate } = useNavigate();

  const logged = JSON.parse(localStorage.getItem("logged"));

  let details = [JSON.parse(localStorage.getItem("firstName")), JSON.parse(localStorage.getItem("lastName"))]

  return (
    <Root className={classes.root}>
      <Grid container className={classes.grid1} spacing={1}>
        <Grid item className={classes.grid}>
          <NavLink
            to="/home"
            className={classes.link}
            style={
              ({ isActive }) => {
                return {
                  color: isActive ? "blue" : ""
                }
              }
            }
          >
            <Typography className={classes.typography} variant="h4">
              Home
            </Typography>
          </NavLink>
        </Grid>
        <Grid item className={classes.grid}>
          <NavLink
            to="/about"
            className={classes.link}
            style={
              ({ isActive }) => {
                return {
                  color: isActive ? "blue" : ""
                }
              }
            }
          >
            <Typography className={classes.typography} variant="h4">
              About
            </Typography>
          </NavLink>
        </Grid>
        <Grid item className={classes.grid}>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={
              <Typography variant="h6" className={classes.primary}>
                to compare two or more companies
              </Typography>
            }
          >
            <NavLink
              to="/comparison"
              className={classes.link}
              style={
                ({ isActive }) => {
                  return {
                    color: isActive ? "blue" : ""
                  }
                }
              }
            >
              <Typography className={classes.typography} variant="h4">
                Comparison
              </Typography>
            </NavLink>
          </Tooltip>
        </Grid>
        <Grid item className={classes.grid}>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={
              <Typography variant="h6" className={classes.primary}>
                to know expected returns of each company
              </Typography>
            }
          >
            <NavLink
              to="/simulation"
              className={classes.link}
              style={
                ({ isActive }) => {
                  return {
                    color: isActive ? "blue" : ""
                  }
                }
              }
            >
              <Typography className={classes.typography} variant="h4">
                Simulation
              </Typography>
            </NavLink>
          </Tooltip>
        </Grid>
        {logged == null || logged === false ? (
          <Grid item className={classes.grid}>
            <NavLink
              to="/login"
              className={classes.link}
              style={
                ({ isActive }) => {
                  return {
                    color: isActive ? "blue" : ""
                  }
                }
              }
            >
              <Typography className={classes.typography} variant="h4">
                Sign In
              </Typography>
            </NavLink>
          </Grid>
        ) : (
          <span />
        )}
        {logged == null || logged === false ? (
          <Grid item className={classes.grid}>
            <NavLink
              to="/signup"
              className={classes.link}
              style={
                ({ isActive }) => {
                  return {
                    color: isActive ? "blue" : ""
                  }
                }
              }
            >
              <Typography className={classes.typography} variant="h4">
                Sign Up
              </Typography>
            </NavLink>
          </Grid>
        ) : (
          <span />
        )}
        {logged == true ? (
          <Grid item>
            <Tooltip
              classes={{ tooltip: classes.tooltip }}
              title={
                <List>
                  {Object.keys(details).map((key) => {
                    if (key === "_id" || key == "password") {
                      return;
                    }
                    const value = details[key];
                    return (
                      <ListItem key={key}>
                        <ListItemText
                          primary={value}
                          classes={{ primary: classes.primary }}
                        ></ListItemText>
                      </ListItem>
                    );
                  })}
                  <ListItem>
                    <Button
                      variant="inherit"
                      classes={{ outlined: classes.outline }}
                      onClick={() => {
                        localStorage.removeItem("logged");
                        localStorage.removeItem("firstName");
                        localStorage.removeItem("lastName");
                        navigate("/");
                      }}
                    >
                      Log Out
                    </Button>
                  </ListItem>
                </List>
              }
            >
              <IconButton>
                <AccountCircleIcon className={classes.largeIcon} />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : (
          <span />
        )}
      </Grid>
    </Root>
  );
}
export default NavigationBar;