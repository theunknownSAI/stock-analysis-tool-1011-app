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

  const storedSectors = localStorage.getItem("sectors");
  const [sectors, setSectors] = useState(storedSectors === undefined || storedSectors === null ? [] : storedSectors);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSectorCompanies, setSelectedSectorCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const storedSeries = localStorage.getItem("series");
  const [series, setSeries] = useState(storedSeries === undefined || storedSeries === null ? [] : storedSeries);

  const navigate = useNavigate();

  useEffect(() => {
    if (storedSectors != null && storedSeries != null && storedSeries[0].data.length != 0) {
      return;
    }
    getSectors();
  }, []);

  const getSectors = async () => {
    await axios.get("api/sectors").then((response) => {
      if (response.status === 200) {
        const { data } = response;
        const { details } = data;
        setSectors(details);
        localStorage.setItem("sectors", JSON.stringify(sectors));
      } else {
        setSectors([]);
      }
    });

    let countdata = {
      name: "Number Of Companies",
      data: []
    };
    for (const key in sectors) {
      if (Object.hasOwnProperty.call(sectors, key)) {
        const element = sectors[key];
        countdata.data.push({ x: key, y: element.length });
      }
    }
    const series = [];
    series.push(countdata);
    setSeries(series);
    localStorage.setItem("series", JSON.stringify(series));
  };

  const selectedSectorFn = (e, val) => {
    if (val === null) {
      setSelectedSector("");
      setSelectedSectorCompanies([]);
    } else {
      setSelectedSector(val);
      setSelectedSectorCompanies(sectors[val]);
    }
  };

  const selectedCompanyFn = (val) => {
    if (val === null) {
      navigate("/");
    } else {
      setSelectedCompany(val);
      navigate("/companydetails/" + val);
    }
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
                selectedSectorFn(e, val);
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
                selectedCompanyFn(val);
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
