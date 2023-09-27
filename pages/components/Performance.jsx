import { createTheme, styled } from '@mui/material/styles';
import React from "react";

const PREFIX = "Performance";

const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
  },
}));

const Performance = () => {
  return <Root className={classes.root}>
    <Typography variant="h4">Performance</Typography>
  </Root>
}

export default Performance;
