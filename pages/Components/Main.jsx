import { TextField, Typography, Tooltip, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  tooltip: {
    backgroundColor: "inherit",
    color: "#ff0000",
    maxWidth: "none",
  },

  heading: {
    zIndex: 1,
    position: "relative",
    color: "#15DB95",
    left: "25%",
    top: 150,
    display: "inline",
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNames: JSON.parse(localStorage.getItem("companyNames")) || [],
    };
  }

  componentDidMount = () => {
    console.log("Main");
    const logged = JSON.parse(localStorage.getItem("logged"));
    if (logged == true) {
      const companyNames = JSON.parse(localStorage.getItem("companyNames"));
      if (companyNames != null) {
        return;
      }
      this.getCompanyNames();
    }
  };

  getCompanyNames = () => {
    axios
      .get("/api/companynames")
      .then((s) => {
        if (s.status === 200) {
          this.setState({ companyNames: s.data }, () => {
            localStorage.setItem(
              "companyNames",
              JSON.stringify(this.state.companyNames)
            );
          });
        } else {
          this.setState({ companyNames: [] });
        }
      })
      .catch((e) => console.log(e));
  };

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

  render() {
    const logged = JSON.parse(localStorage.getItem("logged"));
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <img
            src="/images/stockbg.png"
            style={{
              zIndex: -1,
              position: "absolute",
              width: "100%",
            }}
          />
          <img
            src="/images/logo.png"
            style={{
              position: "absolute",
              width: "25%",
              height: "100%",
              left: "30%",
              top: 25,
              backgroundColor: "inherit",
            }}
          />
          <Typography variant="h4" className={classes.heading}>
            Stock analysis tool for investors in India.
          </Typography>
          <Tooltip
            title={
              logged == false ? (
                <Typography variant="h5">sign in to access</Typography>
              ) : (
                <span />
              )
            }
            classes={{ tooltip: classes.tooltip }}
          >
            <Autocomplete
              disabled={!logged}
              style={{
                width: 400,
                position: "relative",
                left: "30%",
                top: 150,
              }}
              id="search for companies"
              freeSolo
              onChange={(e, val) => {
                this.selectedCompany(e, val);
              }}
              options={this.state.companyNames.map(
                (companyname) => companyname
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search for companies"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </Tooltip>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Main));
