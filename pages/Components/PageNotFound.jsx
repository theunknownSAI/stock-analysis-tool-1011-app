import { Typography } from "@mui/material";
import React from "react";

class PageNotFound extends React.Component {
  componentDidMount = () => {
    console.log("PageNotFound");
  };

  render() {
    return (
      <React.Fragment>
        <div
          sx={{
            padding: "25px",
          }}
        >
          <Typography variant="h4">PageNotFound</Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default PageNotFound;
