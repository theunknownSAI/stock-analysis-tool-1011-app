import {
  Grid,
  TextField,
  Typography,
  Autocomplete
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "../../utils/WithRouter"

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";

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

const Main = () => {

  const storedCompanyNames = localStorage.getItem("companyNames");
  const [companyNames, setCompanyNames] = useState(storedCompanyNames === null || storedCompanyNames === undefined ? [] : storedCompanyNames);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect = (() => {
    if (companyNames != null) {
      return;
    }
    getCompanyNames();
  }, []);

  const getCompanyNames = () => {
    axios
      .get("/api/companynames")
      .then((s) => {
        if (s.status === 200) {
          setCompanyNames(s.data.details);
          localStorage.setItem("companyNames", JSON.stringify(this.state.companyNames));
        } else {
          setCompanyNames([]);
        }
      })
      .catch((e) => console.log(e));
  };

  const { navigate } = useNavigate();

  const selectedCompanyfn = (e, val) => {
    if (val === null) {
      navigate("/");
      return;
    }
    setSelectedCompany(val);
    navigate("/companydetails/" + this.state.selectedCompany);
  };

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
              this.selectedCompanyfn(e, val);
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

export default withRouter(Main);
