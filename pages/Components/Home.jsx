import React from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from " @mui/icons-material/Menu";
import ChevronLeftIcon from " @mui/icons-material/ChevronLeft";
import ChevronRightIcon from " @mui/icons-material/ChevronRight";
import { withStyles } from "@mui/material/styles";
import {
  Route,
  Switch,
  HashRouter,
  withRouter,
  Redirect
} from "react-router-dom";
import { styled } from '@mui/material/styles';

import About from "./About";
import CompanyDetails from "./CompanyDetails";
import Comparison from "./Comparison";
import Login from "./Login";
import NavigationBar from "./NavigationBar";
import PageNotFound from "./PageNotFound";
import Performance from "./Performance";
import Revenue from "./Revenue";
import Sectors from "./Sectors";
import SideBar from "./SideBar";
import SP500 from "./SP500";
import Top from "./Top";
import Simulation from "./Simulation";
import Main from "./Main";
import SignUp from "./SignUp";
import moment from "moment";

const drawerWidth = 300;

const PREFIX = "Home";

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  menuButton: `${PREFIX}-menuButton`,
  hide: `${PREFIX}-hide`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  avatar: `${PREFIX}-avatar`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    display: "flex"
  },[`& .${classes.appBar}`]: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },[`& .${classes.appBarShift}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },[`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2)
  },[`& .${classes.hide}`]: {
    display: "none"
  },[`& .${classes.drawer}`]: {
    width: drawerWidth,
    flexShrink: 0
  },[`& .${classes.drawerPaper}`]: {
    width: drawerWidth
  },[`& .${classes.avatar}`]: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },[`& .${classes.content}`]: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },[`& .${classes.contentShift}`]: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount = () => {
    console.log("Home");
    const curdate =
      localStorage.getItem("date") == null
        ? moment().format("DD-MM-YYYY")
        : localStorage.getItem("date");
    localStorage.setItem("date", curdate);
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  modifyOpen = (e) => {
    this.setState({ open: false });
  };
  render() {
    const { classes, theme } = this.props;
    const open = this.state.open;
    let logged = JSON.parse(localStorage.getItem("logged"));

    return (
      <Root>
        <CssBaseline />
        <AppBar
          position="relative"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
          style={{ backgroundColor: "#15DB95", color: "#0D19A3" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <NavigationBar />
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div
              className={classes.drawerHeader}
              style={{ backgroundColor: "#15DB95", color: "#0D19A3" }}
            >
              <Typography variant="h4">Stock Vestor</Typography>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <SideBar />
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/home" component={Main} />
              <Route
                exact
                path="/login"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Login />;
                  }
                  return <Redirect to="/home" />;
                }}
              />
              <Route
                exact
                path="/signup"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <SignUp />;
                  }
                  return <Redirect to="/home" />;
                }}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/top/:num/:type"
                render={(props) => {
                  const {
                    match: {
                      params: { num, type }
                    }
                  } = props;
                  return <Top key={`num=${num}&type=${type}`} {...props} />;
                }}
              />
              <Route
                exact
                path="/sectors"
                render={(props) => {
                  return <Sectors />;
                }}
              />
              <Route
                exact
                path="/companydetails/:company"
                render={(props) => {
                  const {
                    match: {
                      params: { company }
                    }
                  } = props;
                  return (
                    <CompanyDetails key={`company=${company}`} {...props} />
                  );
                }}
              />
              <Route
                exact
                path="/revenue"
                render={(props) => {
                  return <Revenue />;
                }}
              />
              <Route
                exact
                path="/sp500"
                render={(props) => {
                  return <SP500 />;
                }}
              />
              <Route
                exact
                path="/comparison"
                render={(props) => {
                  return <Comparison />;
                }}
              />
              <Route
                exact
                path="/simulation"
                render={(props) => {
                  return <Simulation />;
                }}
              />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </div>
      </Root>
    );
  }
}
export default withRouter(Home);
