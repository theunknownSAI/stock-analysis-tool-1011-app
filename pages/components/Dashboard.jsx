import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { Button, ButtonGroup, Divider } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import * as Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { dashboardOptions } from "../../utils/constants";

const PREFIX = "Dashboard";
const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`,
  chart: `${PREFIX}-chart`,
  divchart: `${PREFIX}-divchart`,
  buttongroup: `${PREFIX}-buttongroup`,
  button: `${PREFIX}-button`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
  },
  [`& .${classes.chart}`]: {
    width: "75%"
  },
  [`& .${classes.divchart}`]: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  [`& .${classes.buttongroup}`]: {
    display: "flex",
    justifyContent: "center",
    margin: "10px"
  },
  [`& .${classes.button}`]: {
    "&:hover": {
      backgroundColor: "red",
      color: "#ffffff"
    }
  }
}));

const Dashboard = (props) => {

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(false);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(dashboardOptions);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const params = useParams();

  useEffect(() => {
    let company = "";
    if (params.company !== undefined) {
      company = params.company;
    } else {
      company = props.company;
    }

    const fetchDetails = async () => {
      await getDetails(company);
    };
    fetchDetails();
  }, []);

  const getDetails = async (company) => {
    setLoading(true);
    if (company !== "sp500") {
      await getcompanyDetails(company)
    } else {
      await getsp500Details();
    }
  };

  const getsp500Details = async () => {
    await axios
      .get("/api/sp500")
      .then((response) => {
        if (response.status === 200) {
          setDetails(response.data.details);
          setLoading(false);
        } else {
          setDetails([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }

  const getcompanyDetails = async (company) => {
    await axios
      .get("/api/stockdetails?company=" + company)
      .then((response) => {
        if (response.status === 200) {
          setDetails(response.data.details);
          setLoading(false);
        } else {
          setDetails([]);
          setLoading(false);
        }
      })
      .then(() => { })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }

  const createGraph = (days) => {
    let openPriceData = {
      name: "Open Price",
      data: []
    };

    let lowPriceData = {
      name: "Low Price",
      data: []
    };

    let highPriceData = {
      name: "High Price",
      data: []
    };

    let closePriceData = {
      name: "Close Price",
      data: []
    };

    days =
      days === "all"
        ? details.length - 1
        : days > details.length - 1
          ? details.length - 1
          : days;
    const toDate = details[0]["Date"];
    const fromDate = details[days]["Date"];
    const data = details.slice(0, days);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      openPriceData.data.push({
        x: element["Date"],
        y: element["Open Price"] || element["Open"]
      });

      lowPriceData.data.push({
        x: element["Date"],
        y: element["Low Price"] || element["Low"]
      });

      highPriceData.data.push({
        x: element["Date"],
        y: element["High Price"] || element["High"]
      });

      closePriceData.data.push({
        x: element["Date"],
        y: element["Close Price"] || element["Close"]
      });
    }
    let updatedDashboardOptions = dashboardOptions;
    updatedDashboardOptions.xaxis["min"] = fromDate;
    updatedDashboardOptions.xaxis["max"] = toDate;
    const series = [];
    series.push(openPriceData);
    series.push(lowPriceData);
    series.push(highPriceData);
    series.push(closePriceData);
    setSeries(series);
    setOptions(updatedDashboardOptions);

  };

  const selectedPeriodfn = async (e) => {
    const days = e.currentTarget.value;
    setSelectedPeriod(days);
    createGraph(days);
  };

  return (
    <Root className={classes.root}>
      {loading ? (
        <Loader.Audio sx={{ paddingLeft: "50%" }} />
      ) : (
        error !== true && (
          <div>
            <Divider />
            <Divider />
            <Divider />
            <ButtonGroup color="primary" className={classes.buttongroup}>
              <Button
                key="7"
                value="7"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == 7 ? "green" : "",
                  color: selectedPeriod == 7 ? "white" : ""
                }}
                selected
              >
                7D
              </Button>
              <Button
                key="30"
                value="30"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == 30 ? "green" : "",
                  color: selectedPeriod == 30 ? "white" : ""
                }}
              >
                1M
              </Button>
              <Button
                key="90"
                value="90"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == 90 ? "green" : "",
                  color: selectedPeriod == 90 ? "white" : ""
                }}
              >
                3M
              </Button>
              <Button
                key="180"
                value="180"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == 180 ? "green" : "",
                  color: selectedPeriod == 180 ? "white" : ""
                }}
              >
                6M
              </Button>
              <Button
                key="360"
                value="360"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == 360 ? "green" : "",
                  color: selectedPeriod == 360 ? "white" : ""
                }}
              >
                1Y
              </Button>
              <Button
                key="1800"
                value="1800"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == 1800 ? "green" : "",
                  color: selectedPeriod == 1800 ? "white" : ""
                }}
              >
                5Y
              </Button>
              <Button
                key="all"
                value="all"
                className={classes.button}
                onClick={selectedPeriodfn}
                sx={{
                  backgroundColor:
                    selectedPeriod == "all" ? "green" : "",
                  color: selectedPeriod == "all" ? "white" : ""
                }}
              >
                All
              </Button>
            </ButtonGroup>
            <div className={classes.divchart}>
              <Chart
                options={options}
                series={series}
                key="chart"
                className={classes.chart}
              />
            </div>
          </div>
        )
      )}
    </Root>
  );
}

export default Dashboard;
