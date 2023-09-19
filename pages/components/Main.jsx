import { Autocomplete } from "@mui/lab";
import {
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React from "react";
import { withRouter } from "../../utils/WithRouter"

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const PREFIX = "SP500";
const theme = createTheme();

const classes = {
  tooltip: `${PREFIX}-tooltip`,
  large: `${PREFIX}-large`,
  notchedOutline: `${PREFIX}-notchedOutline`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.tooltip}`]: {
    backgroundColor: "inherit",
    color: "#ff0000",
    maxWidth: "none"
  },
  [`& .${classes.large}`]: {
    width: 200,
    height: 200
  },
  [`& .${classes.notchedOutline}`]: {
    borderWidth: "2px",
    borderColor: "#ff0000 !important"
  }
}));

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNames: JSON.parse(localStorage.getItem("companyNames")) || []
    };
  }

  componentDidMount = () => {
    console.log("Main");
    const companyNames = JSON.parse(localStorage.getItem("companyNames"));
    if (companyNames != null) {
      return;
    }
    this.getCompanyNames();
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
    return (
      <Root>
        {/* <img
          src="/images/stockbg.png"
          sx={{
            zIndex: -1,
            position: "absolute",
            width: "100%",
            backgroundSize: "contain",
          }}
        /> */}
        <div
          sx={{
            backgroundImage: `url(${"/images/stockbg.png"})`,
            height: "600px",
            width: "100%",
            marginTop: 20
          }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Grid container direction="row"justify="center"alignItems="center">
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "cursive",
                      fontSize: 50
                    }}
                  >
                    Stock Vestor
                  </Typography>
                </Grid>
                <Grid item>
                  <TrendingUpIcon sx={{ fontSize: 80 }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                Stock analysis tool for investors in India.
              </Typography>
            </Grid>
            <Grid item>
              {/* <Tooltip
                title={
                  logged == null || logged == false ? (
                    <Typography variant="h5">sign in to access</Typography>
                  ) : (
                    <span />
                  )
                }
                classes={{ tooltip: classes.tooltip }}
              > */}
              <Autocomplete
                // disabled={logged != true}
                sx={{
                  width: 400
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
                    InputLabelProps={{
                      sx: { color: "#ff0000" }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                )}
              />
              {/* </Tooltip> */}
            </Grid>
          </Grid>
        </div>
      </Root>
    );
  }
}

export default withRouter(Main);
