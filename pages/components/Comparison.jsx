import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import underscore from "underscore";

import { timePeriod } from "../../utils/constants";

import Dashboard from "./Dashboard";

const theme = createTheme();

const PREFIX = "Comparison";

const classes = {
  root: `${PREFIX}-root`,
  tooltip: `${PREFIX}-tooltip`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px"
  },
  [`& .${classes.tooltip}`]: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    maxWidth: "none"
  }
}));

const Comparison = () => {

  const [loading, setLoading] = useState(false);
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('180');
  const [rate, setRate] = useState('1');
  const [stockdetails, setStockDetails] = useState({});
  const [num, setNum] = useState(10);
  const [error, setError] = useState('');
  const [tooltipopen, setTooltipOpen] = useState(false);

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
      .catch((error) => console.log(error));
  };

  const onClickSubmit = async () => {
    if (selectedCompanies.length < 2) {
      setError("select atleast two companies");
      return;
    } else {
      setError("");
      setLoading(true);
    }

    let stockdetails = {};

    for (let index = 0; index < selectedCompanies.length; index++) {
      const company = selectedCompanies[index];
      stockdetails[company] = {};
    }

    for (let index = 0; index < selectedCompanies.length; index++) {
      const company = selectedCompanies[index];
      await getpreviousdaystockdetails(company, stockdetails);
      await getcomparision(company, stockdetails);
    }
    setStockDetails(stockdetails);
    setLoading(false);
  };

  const getpreviousdaystockdetails = async (company, stockdetails) => {
    await axios
      .get("/api/previousdaystockdetails?company=" + company)
      .then((response) => {
        if (response.status === 200) {
          stockdetails[company] = Object.assign(
            stockdetails[company],
            response.data.details
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getcomparision = async (company, stockdetails) => {
    await axios
      .get("/api/comparision?days=" + selectedTimePeriod + "&rate=" + rate + "&company=" + company)
      .then((response) => {
        if (response.status === 200) {
          stockdetails[company] = Object.assign(
            stockdetails[company],
            response.data.details
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const period = underscore.invert(timePeriod);
  let logged = JSON.parse(localStorage.getItem("logged"));
  let cnt = Object.keys(stockdetails).length;
  return (
    <Root className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Autocomplete
            multiple
            value={selectedCompanies}
            onChange={(e, company, reason, detail) => {
              if (reason === "remove-option") {
                let companies = stockdetails;
                delete companies[detail.option];
                setStockDetails(companies);
              } else {
                setSelectedCompanies(company);
              }
            }}
            id="select multiple companies"
            freeSolo
            options={companyNames.map(
              (companyname) => companyname
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="select multiple companies"
                margin="normal"
                variant="outlined"
                helperText={error}
                error={error !== ""}
              />
            )}
          />
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: "150px" }} variant="outlined">
            <InputLabel>trading period</InputLabel>
            <Select
              sx={{ width: "100%" }}
              labelId="trading period"
              id="trading"
              onChange={(e) => {
                setSelectedTimePeriod(e.target.value);
              }}
              value={selectedTimePeriod}
            >
              {Object.keys(timePeriod).map((period) => {
                return (
                  <MenuItem
                    key={period.toString()}
                    value={timePeriod[period]}
                  >
                    {period}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            sx={{ width: "100%" }}
            inputProps={{ min: "-100", max: "100", step: "0.01" }}
            label="rate of growth"
            variant="outlined"
            value={rate}
            onChange={(e) => {
              setRate(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Tooltip
            open={tooltipopen}
            classes={{ tooltip: classes.tooltip }}
            title={
              <Typography variant="h6" className={classes.primary}>
                sign in to access
              </Typography>
            }
            interactive
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                if (logged === true) {
                  onClickSubmit();
                } else {
                  setTooltipOpen(true);
                }
              }}
            >
              Submit
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
      <Divider />
      {loading ? (
        <Loader.Audio sx={{ paddingLeft: "50%" }} />
      ) : (
        cnt !== 0 && (
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            {Object.keys(stockdetails).map((company) => {
              const element = stockdetails[company];
              return (
                <Grid item xs={6} key={company.toString()}>
                  <Paper
                    sx={{
                      display: "flex",
                      padding: "15px",
                      margin: "15px",
                      justifyContent: "center"
                    }}
                  >
                    <NavLink
                      to={{
                        pathname: "companydetails/" + element["company"]
                      }}
                    >
                      <Typography variant="h6">
                        {element["company"]}
                      </Typography>
                    </NavLink>
                  </Paper>
                  <Typography variant="h6">
                    In the last {period[element["totalNumberOfDays"]]}, for{" "}
                    {element["percentOfPositiveDays"]} percent of trading
                    days {","} positive close price growth rate was more
                    than {element["rate"]} %
                  </Typography>
                  <Divider />
                  <Divider />
                  <Typography variant="h6">
                    In the last {period[element["totalNumberOfDays"]]}, for{" "}
                    {element["percentOfNegativeDays"]} percent of trading
                    days {","} negative close price growth rate was less
                    than {element["rate"]} %
                  </Typography>
                  <Dashboard company={company} />
                  {Object.keys(element).map((key) => {
                    if (key.toLowerCase() === "company") {
                      return;
                    }
                    let res = key + " : " + element[key];
                    return (
                      <Chip
                        key={key.toString()}
                        color="primary"
                        variant="outlined"
                        label={res}
                        sx={{ margin: "5px" }}
                      />
                    );
                  })}
                </Grid>
              );
            })}
          </Grid>
        )
      )}
    </Root>
  );
}

export default Comparison;
