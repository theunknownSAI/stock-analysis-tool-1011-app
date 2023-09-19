import { Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import React from "react";

const PREFIX = "PageNotFound";

const theme = createTheme();
const classes = {
  root: `${PREFIX}-root`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
  }, 
}));

class PageNotFound extends React.Component {
  componentDidMount = () => {
    console.log("PageNotFound");
  };

  render() {
    return (
      <Root className={classes.root}>
        <Typography variant="h4">PageNotFound</Typography>
      </Root>
    );
  }
}

export default PageNotFound;
