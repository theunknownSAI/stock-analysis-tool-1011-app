import { Typography } from "@material-ui/core";
import React from "react";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    console.log("Main");
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <img
            src="/images/stocks6.png"
            style={{
              position: "absolute",
              width: "100%",
            }}
          />
          <Typography
            variant="h4"
            style={{
              zIndex: 1,
              position: "relative",
              color: "#15DB95",
              left: "25%",
              top: 50,
              display: "inline",
            }}
          >
            Stock analysis tool for investors in India.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
