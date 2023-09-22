import { Paper, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import moment from "moment";
import React from "react";
import * as Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { withRouter } from "../../utils/WithRouter";

const PREFIX = "Top";
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
    const {router} = this.props;
    const {params} = router;
    const { num, type } = params; 
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
          this.setState({ topCompanies: [], loading: false }, () => { });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ topCompanies: [], loading: false }, () => { });
      });
  };

  render() {
    return (
      <Root className={classes.root}>
        {this.state.loading ? (
          <Loader.Audio sx={{ paddingLeft: "50%" }} />
        ) : (
          <div sx={{ backgroundColor: "inherit" }}>
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
      </Root>
    );
  }
}

export default withRouter(Top);
