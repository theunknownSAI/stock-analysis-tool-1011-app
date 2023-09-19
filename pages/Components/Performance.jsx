import React from "react";
import { createTheme, styled } from '@mui/material/styles';

const PREFIX = "Performance";

const theme = createTheme();
const classes = {
}

const Root = styled('div')(({ theme }) => ({
}));


class Performance extends React.Component {
  componentDidMount = () => {
    console.log("Performance");
  };
  render() {
    return <Root>Performance</Root>;
  }
}

export default Performance;
