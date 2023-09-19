import { Paper, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import React from "react";

import Dashboard from "./Dashboard";

const PREFIX = "SP500";
const theme = createTheme();
const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
  },
  [`& .${classes.paper}`]: {
    display: "flex",
    padding: "15px",
    margin: "15px",
    justifyContent: "center",
    backgroundColor: "inherit",
  }
}));

class SP500 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sp500: [] };
  }
  componentDidMount = () => {
    console.log("SP500");
  };
  render() {
    return (
      <Root className={classes.root}>
        <Paper elevation={0} className={classes.paper} align="center">
          <Typography variant="h4">{"SP 500"}</Typography>
        </Paper>
        <Dashboard company="sp500" />
      </Root>
    );
  }
}

export default SP500;
