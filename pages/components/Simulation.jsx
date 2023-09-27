import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import * as Loader from "react-loader-spinner";

const PREFIX = "Simulation";
const theme = createTheme();

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

const Simulation = () => {

  const [cols, setCols] = useState("");
  const [loading, setLoading] = useState(false);
  const [tooltipopen, settooltipopen] = useState(false);
  const [days, setDays] = useState("");
  const [rows, setRows] = useState("");

  const onSelectDays = async (e) => {
    const days = e.target.value;
    setDays(days);
    setLoading(true);
    await axios
      .get("/api/simulationtop" + "?" + "days=" + days)
      .then((response) => {
        if (response.status === 200) {
          let rows = response.data.details;
          let cols = [];
          Object.keys(rows[0]).map((key) => {
            cols.push({ field: key, headerName: key, width: 150 });
          });

          for (let i = 0; i < cols.length; i++) {
            const element = cols[i];
            if (element["field"] == "company") {
              element["width"] = 300;
              cols[i] = element;
            }
            if (element["field"] == "predicted") {
              cols.splice(i, 1);
            }
          }
          setRows(rows);
          setCols(cols);
          setLoading(false);
        } else {
          setRows([]);
          setCols([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setRows([]);
        setCols([]);
        setLoading(false);
        console.log(error);
      });
  };

  const exportToCSV = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  // const today = new Date();
  let logged = JSON.parse(localStorage.getItem("logged"));
  return (
    <Root className={classes.root}>
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
        <FormControl sx={{ minWidth: "150px" }} variant="outlined">
          <InputLabel>days</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="days"
            id="days"
            onChange={(e) => {
              const val = e.target.value;
              if (logged === true) {
                onSelectDays(e);
              } else {
                setDays(val);
                settooltipopen(true);
              }
            }}
            value={days}
          >
            {[30, 60, 90, 180, 360, 720].map((period) => {
              return (
                <MenuItem key={period.toString()} value={period}>
                  {period}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Tooltip>

      {loading ? (
        <Loader.Audio />
      ) : (
        rows != 0 && (
          <DataGrid
            rows={rows}
            columns={cols}
            autoHeight
            disableSelectionOnClick
            // hideFooterPagination
            // hideFooter
            components={{
              Toolbar: exportToCSV
            }}
          />
        )
      )}
    </Root>
  );
}

export default Simulation;
