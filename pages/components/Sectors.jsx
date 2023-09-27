import { Autocomplete, Grid, TextField } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import dynamic from "next/dynamic";
import { sectorChartOptions } from "../../utils/constants";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PREFIX = "Sectors";
const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`,
  chart: `${PREFIX}-chart`,
  divchart: `${PREFIX}-divchart`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
  },
  [`& .${classes.chart}`]: {
    width: "75%"
  },
  [`& .${classes.divchart}`]: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
}));

const Sectors = () => {

  const [sectors, setSectors] = useState([]);
  const [selectedSectorCompanies, setSelectedSectorCompanies] = useState([]);
  const [series, setSeries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSectors = async () => {
      await getSectors();
    };
    fetchSectors();
  }, []);

  const getSectors = async () => {
    let sectorsresponse = [];
    await axios.get("api/sectors").then((response) => {
      if (response.status === 200) {
        sectorsresponse = response.data.details;
        setSectors(response.data.details);
      } else {
        setSectors([]);
      }
    });

    let countdata = {
      name: "Number Of Companies",
      data: []
    };

    for (const key in sectorsresponse) {
      if (Object.hasOwnProperty.call(sectorsresponse, key)) {
        const element = sectorsresponse[key];
        countdata.data.push({ x: key, y: element.length });
      }
    }
    const series = [];
    series.push(countdata);
    setSeries(series);
  };

  return (
    <Root className={classes.root}>
      <div className={classes.divchart}></div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          {sectors.length !== 0 && (
            <Autocomplete
              sx={{
                width: 400
              }}
              onChange={(e, val) => {
                if (val === null) {
                  setSelectedSectorCompanies([]);
                } else {
                  setSelectedSectorCompanies(sectors[val]);
                }
              }}
              id="search for sector"
              freeSolo
              options={Object.keys(sectors).map(
                (sector) => sector
              )}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search for sector"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          )}
        </Grid>
        <Grid item>
          {selectedSectorCompanies.length !== 0 && (
            <Autocomplete
              sx={{ width: 400, align: "center" }}
              onChange={(e, val) => {
                if (val === null) {
                  navigate("/");
                } else {
                  navigate("/companydetails/" + val);
                }
              }}
              id="search for companies"
              freeSolo
              options={selectedSectorCompanies.map(
                (company) => company
              )}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search for company"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          )}
        </Grid>
        <Grid item sx={{ width: "75%" }}>
          <Chart
            options={sectorChartOptions}
            series={series}
            key="chart"
            type="bar"
          />
        </Grid>
      </Grid>
    </Root>
  );
}

export default Sectors;
