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
import moment from "moment";
import React from "react";
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

class Simulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: JSON.parse(localStorage.getItem("cols")) || [],
      loading: false,
      tooltipopen: false,
      days: JSON.parse(localStorage.getItem("days")) || "",
      rows: JSON.parse(localStorage.getItem("rows")) || []
    };
  }

  componentDidMount = () => {
  };

  onSelectDays = async (e) => {
    const days = e.target.value;
    const prevdays = localStorage.getItem("days");
    // const curdate = moment().format("DD-MM-YYYY");
    // const prevdate =
    //   localStorage.getItem("date") == null
    //     ? curdate
    //     : localStorage.getItem("date");

    // if (days == prevdays && prevdate == curdate) {
    //   return;
    // }
    this.setState({ days: days }, () => {
      localStorage.setItem("days", JSON.stringify(this.state.days));
    });

    this.setState({ loading: true }, () => { });
    await axios
      .get("/api/simulationtop" + "?" + "days=" + days)
      .then((s) => {
        if (s.status === 200) {
          let response = s.data;
          const rows = response;
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
          this.setState({ rows: rows, cols: cols, loading: false }, () => {
            localStorage.setItem("rows", JSON.stringify(this.state.rows));
            localStorage.setItem("cols", JSON.stringify(this.state.cols));
          });
        } else {
          this.setState({ rows: [], cols: [], loading: false }, () => { });
        }
      })
      .catch((e) => {
        this.setState({ rows: [], cols: [], loading: false }, () => { });
        console.log(e);
      });
  };

  exportToCSV = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  render() {
    // const today = new Date();
    let logged = JSON.parse(localStorage.getItem("logged"));
    return (
      <Root className={classes.root}>
        <Tooltip
          open={this.state.tooltipopen}
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
                  this.onSelectDays(e);
                } else {
                  this.setState({
                    days: val,
                    tooltipopen: true
                  });
                }
              }}
              value={this.state.days}
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

        {this.state.loading ? (
          <Loader.Audio />
        ) : (
          this.state.rows != 0 && (
            <DataGrid
              rows={this.state.rows}
              columns={this.state.cols}
              autoHeight
              disableSelectionOnClick
              // hideFooterPagination
              // hideFooter
              components={{
                Toolbar: this.exportToCSV
              }}
            />
          )
        )}
      </Root>
    );
  }
}

export default Simulation;
