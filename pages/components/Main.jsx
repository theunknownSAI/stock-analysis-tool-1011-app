import {
  Grid,
  TextField,
  Typography,
  Autocomplete
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
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

  const [companyNames, setCompanyNames] = useState([]);

  useEffect(() => {
    const fetchCompanyNames = async () => {
      await getCompanyNames();
    };
    fetchCompanyNames();
  }, []);

  const getCompanyNames = async () => {
    let companyNames = [];
    await axios
      .get("/api/companynames")
      .then((response) => {
        if (response.status === 200) {
          setCompanyNames(response.data.details);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const navigate = useNavigate();

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
              if (val === null) {
                navigate("/");
              } else {
                navigate("/companydetails/" + val);
              }
            }}
            options={companyNames.map(
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

export default Main;
