import { Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import moment from "moment";
import React from "react";
import * as Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";

const PREFIX = "Top";

const classes = {
  paper: `${PREFIX}-paper`,
  navlink: `${PREFIX}-navlink`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.paper}`]: {
    display: "flex",
    padding: "15px",
    justifyContent: "center",
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: "#15DB95",
      color: "#0D19A3",
    },
  },
  [`& .${classes.navlink}`]: {
    textDecoration: "none",
  }
}));

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      num: JSON.parse(localStorage.getItem("num")) || "",
      type: JSON.parse(localStorage.getItem("type")) || "",
      topCompanies: JSON.parse(localStorage.getItem("topCompanies")) || [],
    };
  }

  componentDidMount = () => {
    console.log("Top");
    const { match } = this.props;
    const { num, type } = match.params;
    const prevnum = JSON.parse(localStorage.getItem("num"));
    const prevtype = JSON.parse(localStorage.getItem("type"));
    const topCompanies = JSON.parse(localStorage.getItem("topCompanies"));
    const curdate = moment().format("DD-MM-YYYY");
    const prevdate =
      localStorage.getItem("date") == null
        ? curdate
        : localStorage.getItem("date");
    if (
      prevtype === type &&
      prevnum === num &&
      topCompanies != null &&
      prevdate == curdate
    ) {
      return;
    }

    this.setState({ num: num, type: type, loading: true }, () => {
      localStorage.setItem("num", JSON.stringify(this.state.num));
      localStorage.setItem("type", JSON.stringify(this.state.type));
    });
    axios
      .get("/api/top?type=" + type + "&" + "num=" + num)
      .then((s) => {
        if (s.status === 200) {
          let topCompanies = s.data;
          this.setState({ topCompanies: topCompanies, loading: false }, () => {
            localStorage.setItem(
              "topCompanies",
              JSON.stringify(this.state.topCompanies)
            );
          });
        } else {
          this.setState({ topCompanies: [], loading: false }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ topCompanies: [], loading: false }, () => {});
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Root>
        <div
          style={{
            padding: "25px",
          }}
        >
          {this.state.loading ? (
            <Loader.Audio style={{ paddingLeft: "50%" }} />
          ) : (
            <div style={{ backgroundColor: "inherit" }}>
              <Paper elevation={0} className={classes.paper}>
                <Typography variant="h4">
                  Top {this.state.num} Companies for{" "}
                  {this.state.type === "buy" ? "Investing" : "Trading"}
                </Typography>
              </Paper>
              {this.state.topCompanies.map((company) => {
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
        </div>
      </Root>
    );
  }
}

export default Top;
