import {
  Grid,
  TextField,
  Typography,
  Autocomplete
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React from "react";
import { withRouter } from "../../utils/WithRouter"

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const PREFIX = "SP500";
const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`,
  tooltip: `${PREFIX}-tooltip`,
  large: `${PREFIX}-large`,
  notchedOutline: `${PREFIX}-notchedOutline`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
  },
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
    const { router } = this.props;
    const { navigate } = router;
    if (val === null) {
      navigate("/");
      return;
    }
    this.setState({ selectedCompany: val }, () => {
      navigate("/companydetails/" + this.state.selectedCompany);
    });
  };

  render() {
    const logged = JSON.parse(localStorage.getItem("logged"));
    return (
      <Root className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Grid container direction="row" justify="center" alignItems="center">
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
          </Grid>
        </Grid>
      </Root>
    );
  }
}

export default withRouter(Main);
