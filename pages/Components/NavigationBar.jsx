// import AccountCircleIcon from " @mui/icons-material/AccountCircle";
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
import { styled } from '@mui/material/styles';
import React from "react";
import { NavLink, } from "react-router-dom";
import { withRouter } from "../../utils/WithRouter"
const PREFIX = "NavigationBar";

const classes = {
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
  [`& .${classes.grid1}`]: {
    flexGrow: 1
  }, [`& .${classes.paper}`]: {
    textAlign: "center",
    color: theme.palette.text.secondary
  }, [`& .${classes.link}`]: {
    textDecoration: "initial"
  }, [`& .${classes.grid}`]: {
    "&:hover": {
      backgroundColor: "#F4E4C1",
      color: "#E4C580"
    }
  }, [`& .${classes.typography}`]: {
    padding: 20
  }, [`& .${classes.largeIcon}`]: {
    width: 60,
    height: 60,
    fontSize: 25
  },[`& .${classes.tooltip}`]: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    maxWidth: "none"
  },[`& .${classes.tooltip}`]: {
    fontSize: 14
  },[`& .${classes.tooltip}`]: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    maxWidth: "none"
  }
}));

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: " "
      // companyNames: JSON.parse(localStorage.getItem("companyNames")) || [],
    };
  }

  selectedCompany = (e, val) => {
    const { history } = this.props;
    if (val === null) {
      history.push("/");
      return;
    }
    this.setState({ selectedCompany: val }, () => {
      history.push("/companydetails/" + this.state.selectedCompany);
    });
  };

  componentDidMount = () => {
    console.log("NavigationBar");
    // const companyNames = JSON.parse(localStorage.getItem("companyNames"));
    // if (companyNames != null) {
    //   return;
    // }

    // this.getCompanyNames();
  };

  // getCompanyNames = () => {
  //   axios
  //     .get("/api/companynames")
  //     .then((s) => {
  //       if (s.status === 200) {
  //         this.setState({ companyNames: s.data }, () => {
  //           localStorage.setItem(
  //             "companyNames",
  //             JSON.stringify(this.state.companyNames)
  //           );
  //         });
  //       } else {
  //         this.setState({ companyNames: [] });
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // };

  render() {
    const { history, theme } = this.props;
    const logged = JSON.parse(localStorage.getItem("logged"));
    let details = JSON.parse(localStorage.getItem("details")) || [];
    // const firstName = JSON.parse(localStorage.getItem("firstName"));
    // const lastName = JSON.parse(localStorage.getItem("lastName"));
    // const userName = firstName + " " + lastName;
    // const email = JSON.parse(localStorage.getItem("email"));
    // details.push(userName);
    // details.push(email);
    // console.log(details);
    return (
      <Root>
        <Grid container className={classes.grid1} spacing={1}>
          <Grid item xs={11}>
            <Grid container justify="center">
              <Grid item className={classes.grid}>
                <NavLink
                  to="/home"
                  className={classes.link}
                  activeStyle={{ color: "blue" }}
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
                  activeStyle={{ color: "blue" }}
                >
                  <Typography className={classes.typography} variant="h4">
                    About
                  </Typography>
                </NavLink>
              </Grid>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={
                  <Typography variant="h6" className={classes.primary}>
                    to compare two or more companies
                  </Typography>
                }
                interactive
              >
                <Grid item className={classes.grid}>
                  <NavLink
                    to="/comparison"
                    className={classes.link}
                    activeStyle={{ color: "blue" }}
                  >
                    <Typography className={classes.typography} variant="h4">
                      Comparison
                    </Typography>
                  </NavLink>
                </Grid>
              </Tooltip>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={
                  <Typography variant="h6" className={classes.primary}>
                    to know expected returns of each company
                  </Typography>
                }
                interactive
              >
                <Grid item className={classes.grid}>
                  <NavLink
                    to="/simulation"
                    className={classes.link}
                    activeStyle={{ color: "blue" }}
                  >
                    <Typography className={classes.typography} variant="h4">
                      Simulation
                    </Typography>
                  </NavLink>
                </Grid>
              </Tooltip>
              {logged == null || logged === false ? (
                <Grid item className={classes.grid}>
                  <NavLink
                    to="/login"
                    className={classes.link}
                    activeStyle={{ color: "blue" }}
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
                    activeStyle={{ color: "blue" }}
                  >
                    <Typography className={classes.typography} variant="h4">
                      Sign Up
                    </Typography>
                  </NavLink>
                </Grid>
              ) : (
                <span />
              )}
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container justify="flex-end">
              {logged == true ? (
                <Grid item>
                  <Tooltip
                    classes={{ tooltip: classes.tooltip }}
                    interactive
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
                            variant="outlined"
                            classes={{ outlined: classes.outline }}
                            onClick={() => {
                              window.localStorage.clear();
                              // localStorage.setItem("logged", JSON.stringify(false));
                              history.push("/");
                            }}
                          >
                            Log Out
                          </Button>
                        </ListItem>
                      </List>
                    }
                  >
                    <IconButton>
                      {/* <AccountCircleIcon className={classes.largeIcon} /> */}
                    </IconButton>
                  </Tooltip>
                </Grid>
              ) : (
                <span />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Root>
    );
  }
}
export default withRouter(NavigationBar);