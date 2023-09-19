import { Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import React from "react";

const PREFIX = "PageNotFound";

const theme = createTheme();
const classes = {
}

const Root = styled('div')(({ theme }) => ({
}));

class PageNotFound extends React.Component {
  componentDidMount = () => {
    console.log("PageNotFound");
  };

  render() {
    return (
      <Root>
        <div
          sx={{
            padding: "25px",
          }}
        >
          <Typography variant="h4">PageNotFound</Typography>
        </div>
      </Root>
    );
  }
}

export default PageNotFound;
