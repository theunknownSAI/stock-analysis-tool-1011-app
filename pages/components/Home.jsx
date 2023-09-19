import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import clsx from "clsx";
import React from "react";
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { withRouter } from "../../utils/WithRouter";

import { createTheme, styled } from '@mui/material/styles';
import moment from "moment";
import About from "./About";
import CompanyDetails from "./CompanyDetails";
import Comparison from "./Comparison";
import Login from "./Login";
import Main from "./Main";
import NavigationBar from "./NavigationBar";
import PageNotFound from "./PageNotFound";
import Revenue from "./Revenue";
import SP500 from "./SP500";
import Sectors from "./Sectors";
import SideBar from "./SideBar";
import SignUp from "./SignUp";
import Simulation from "./Simulation";
import Top from "./Top";

const theme = createTheme();
const drawerWidth = 300;
const PREFIX = "Home";

const classes = {
  root: `${PREFIX}-root`,
  sidebar: `${PREFIX}-sidebar`,
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
  largeIcon: `${PREFIX}-largeIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
  },
  [`& .${classes.sidebar}`]: {
    display: "flex"
  },
  [`& .${classes.appBar}`]: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  [`& .${classes.appBarShift}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2)
  },
  [`& .${classes.hide}`]: {
    display: "none"
  },
  [`& .${classes.drawer}`]: {
    width: drawerWidth,
    flexShrink: 0
  },
  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth
  },
  [`& .${classes.avatar}`]: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  [`& .${classes.content}`]: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  [`& .${classes.contentShift}`]: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  [`& .${classes.largeIcon}`]: {
    width: 60,
    height: 60,
    fontSize: 25
  },
  [`& .${classes.drawerHeader}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center"
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
    const open = this.state.open;
    let logged = JSON.parse(localStorage.getItem("logged"));

    return (
      <Root className={classes.root} >
        <CssBaseline />
        <AppBar
          position="relative"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
          sx={{ backgroundColor: "#15DB95", color: "#0D19A3" }}
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
        <div className={classes.sidebar}>
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
              sx={{ backgroundColor: "#15DB95", color: "#0D19A3" }}
            >
              <Typography variant="h4">Stock Vestor</Typography>
              <IconButton onClick={this.handleDrawerClose} className={classes.largeIcon}>
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
            <Routes>
              <Route exact path="/" element={<Main/>} />
              <Route exact path="/home" element={<Main/>} />
              <Route
                exact
                path="/login"
                element = {
                  logged === null || logged === false ? (
                    <Login/>
                  ) : (
                    <Navigate to="/home" replace/>
                  )
                }
              />
              <Route
                exact
                path="/signup"
                element = {
                  logged === null || logged === false ? (
                    <SignUp/>
                  ) : (
                    <Navigate to="/home" replace/>
                  )
                }
              />
              <Route exact path="/about" element={<About/>} />
              <Route
                exact
                path="/top/:num/:type"
                element = { ({ params }) => {
                    const {num, type} = params;
                    return <Top key={`num=${num}&type=${type}`} {...props} />
                  }
                }
              />
              <Route
                exact
                path="/sectors"
                element = {<Sectors/>}
              />
              <Route
                exact
                path="/companydetails/:company"
                element = { ({ params }) => {
                  const {company} = params;
                    return <CompanyDetails key={`company=${company}`} {...props} />
                  }
                }
              />
              <Route
                exact
                path="/revenue"
                element = {<Revenue/>}
              />
              <Route
                exact
                path="/sp500"
                element = {<SP500/>}
              />
              <Route
                exact
                path="/comparison"
                element = {<Comparison/>}
              />
              <Route
                exact
                path="/simulation"
                element = {<Simulation/>}
              />
              <Route element={<PageNotFound/>} />
            </Routes>
          </main>
        </div>
      </Root>
    );
  }
}
export default withRouter(Home);
