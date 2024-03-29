import { Paper, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import moment from "moment";
import React from "react";
import * as Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";

const PREFIX = "Revenue";
const theme = createTheme();
const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  navlink: `${PREFIX}-navlink`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
  },
  [`& .${classes.paper}`]: {
    display: "flex",
    padding: "15px",
    justifyContent: "center",
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: "#15DB95",
      color: "#0D19A3",
    }
  },
  [`& .${classes.navlink}`]: {
    textDecoration: "none",
  }
}));

class Revenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topCompaniesRevenue:
        JSON.parse(localStorage.getItem("topCompaniesRevenue")) || [],
      num: JSON.parse(localStorage.getItem("num")) || 30,
      loading: false,
    };
  }

  componentDidMount = () => {
    const num = JSON.parse(localStorage.getItem("num"));
    const topCompaniesRevenue = JSON.parse(
      localStorage.getItem("topCompaniesRevenue")
    );
    // const curdate = moment().format("DD-MM-YYYY");
    // const prevdate =
    //   localStorage.getItem("date") == null
    //     ? curdate
    //     : localStorage.getItem("date");

    if (
      topCompaniesRevenue != null &&
      topCompaniesRevenue.length !== 0 
      // &&       prevdate == curdate
    ) {
      return;
    }

    this.setState({ loading: true }, () => { });
    axios
      .get("/api/previousdaystockdetails")
      .then((s) => {
        if (s.status === 200) {
          let companyStockDetails = s.data;
          companyStockDetails.sort((a, b) => {
            return a["Revenue"] - b["Revenue"];
          });
          companyStockDetails = companyStockDetails.slice(0, this.state.num);
          let topCompaniesRevenue = [];
          for (let index = 0; index < companyStockDetails.length; index++) {
            const element = companyStockDetails[index];
            topCompaniesRevenue.push(element["Company"]);
          }
          this.setState(
            { topCompaniesRevenue: topCompaniesRevenue, loading: false },
            () => {
              localStorage.setItem(
                "topCompaniesRevenue",
                JSON.stringify(this.state.topCompaniesRevenue)
              );
            }
          );
        } else {
          this.setState({ topCompaniesRevenue: [], loading: false }, () => { });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ topCompaniesRevenue: [], loading: false }, () => { });
      });
  };

  render() {
    return (
      <Root className={classes.root}>
        {this.state.loading ? (
          <Loader.Audio sx={{ paddingLeft: "50%" }} />
        ) : (
          <div>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h4">
                Top {this.state.num} Companies Revenue wise
              </Typography>
            </Paper>
            {this.state.topCompaniesRevenue.map((company) => {
              return (
                <NavLink
                  className={classes.navlink}
                  key={company.toString()}
                  to={{
                    pathname: "/companydetails/" + company,
                  }}
                >
                  <Paper elevation={0} className={classes.paper}>
                    <Typography variant="h6">{company}</Typography>
                  </Paper>
                </NavLink>
              );
            })}
          </div>
        )}
      </Root>
    );
  }
}

export default Revenue;
