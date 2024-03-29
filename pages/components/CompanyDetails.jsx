import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, Tooltip,
  Typography
} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import moment from "moment";
import React from "react";
import * as Loader from "react-loader-spinner";

import { withRouter } from "../../utils/WithRouter";
import Dashboard from "./Dashboard";

const theme = createTheme();

const PREFIX = "CompanyDetails";

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  tooltip: `${PREFIX}-tooltip`,
  allitems: `${PREFIX}-allitems`,
  chip: `${PREFIX}-chip`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px"
  },
  [`& .${classes.paper}`]: {
    display: "flex",
    padding: "15px",
    margin: "15px",
    justifyContent: "center"
  },
  [`& .${classes.tooltip}`]: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    maxWidth: "none"
  },
  [`& .${classes.allitems}`]: {
    "&:hover": {
      backgroundColor: "#15DB95",
      color: "#0D19A3"
    }
  },
  [`& .${classes.chip}`]: {
    margin: "5px", backgroundColor: "#ffffff", color: "#5F00E7"
  }
}));

class CompanyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: JSON.parse(localStorage.getItem("companyDetails")) || [],
      companyCurrentDayStockDetails:
        JSON.parse(localStorage.getItem("companyCurrentDayStockDetails")) || [],
      selectedCompany:
        JSON.parse(localStorage.getItem("selectedCompany")) || "",
      companydetailsloading: false,
      stockdetailsloading: false,
      suggest: JSON.parse(localStorage.getItem("suggest")) || "",
      necessarykeys: [
        "Date",
        "Open Price",
        "High Price",
        "Low Price",
        "Close Price"
      ],
      otherkeys: [
        "WAP",
        "No.of Shares",
        "No. of Trades",
        "Total Turnover (Rs.)",
        "% Deli. Qty to Traded Qty",
        "Spread High-Low",
        "Spread Close-Open"
      ],
      stockdetails: JSON.parse(localStorage.getItem("stockdetails")) || []
    };
  }

  componentDidMount = () => {

    const { router } = this.props;
    const { params} = router;
    const {company} = params;

    const prevcompany = JSON.parse(localStorage.getItem("selectedCompany"));
    // const curdate = moment().format("DD-MM-YYYY");
    // const prevdate =
    //   localStorage.getItem("date") == null
    //     ? curdate
    //     : localStorage.getItem("date");

    // if (prevcompany === company && prevdate === curdate) {
    //   return;
    // }

    if (prevcompany === company) {
      return;
    }
    
    this.setState({ selectedCompany: company }, () => {
      localStorage.setItem(
        "selectedCompany",
        JSON.stringify(this.state.selectedCompany)
      );
      this.getDetails(this.state.selectedCompany);
    });
  };

  getDetails = async (company) => {
    this.getCompanyDetails(company);
    this.getStockDetails(company);
    this.getSuggestion(company);
  };

  getCompanyDetails = async (company) => {
    this.setState({ companydetailsloading: true }, () => { });
    await axios
      .get("/api/companydetails?company=" + company)
      .then((s) => {
        if (s.status === 200) {
          let companyDetails = s.data;

          this.setState(
            { companyDetails: companyDetails, companydetailsloading: false },
            () => {
              localStorage.setItem(
                "companyDetails",
                JSON.stringify(this.state.companyDetails)
              );
            }
          );
        } else {
          this.setState(
            { companyDetails: [], companydetailsloading: false },
            () => { }
          );
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState(
          { companyDetails: [], companydetailsloading: false },
          () => { }
        );
      });
  };

  getStockDetails = async (company) => {
    this.setState({ stockdetailsloading: true }, () => { });
    await axios
      .get("/api/previousdaystockdetails?company=" + company)
      .then((s) => {
        if (s.status === 200) {
          this.setState(
            { stockdetails: s.data, stockdetailsloading: false },
            () => {
              localStorage.setItem(
                "stockdetails",
                JSON.stringify(this.state.stockdetails)
              );
            }
          );
        } else {
          this.setState(
            { stockdetails: [], stockdetailsloading: false },
            () => { }
          );
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState(
          { stockdetails: [], stockdetailsloading: false },
          () => { }
        );
      });
  };

  getSuggestion = async (company) => {
    await axios
      .get("/api/suggest?company=" + company)
      .then((t) => {
        if (t.status === 200) {
          let suggest = t.data["suggest"];
          if (suggest.length === 0) {
            suggest = "hold";
          }
          this.setState({ suggest: suggest }, () => {
            localStorage.setItem("suggest", JSON.stringify(this.state.suggest));
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <Root className={classes.root}>
        {this.state.selectedCompany !== "" && (
          <div>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h4">
                {this.state.selectedCompany}
              </Typography>
            </Paper>
            <Divider />
            {this.state.companydetailsloading === true ? (
              <Loader.Audio sx={{ paddingLeft: "50%" }} />
            ) : (
              <Grid
                container
                spacing={3}
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {Object.keys(this.state.companyDetails).map((key) => {
                          if (this.state.companyDetails[key] === null) {
                            return <span key={key.toString()}></span>;
                          }
                          return (
                            <TableRow className={classes.allitems}>
                              <TableCell>{key}</TableCell>
                              <TableCell align="right">
                                {this.state.companyDetails[key]}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h4">SUGGESTION</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              background:
                                this.state.suggest == "sell" ? "green" : "red"
                            }}
                          >
                            <Typography variant="h4">SELL</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              background:
                                this.state.suggest == "buy" ? "green" : "red"
                            }}
                          >
                            <Typography variant="h4">BUY</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              background:
                                this.state.suggest == "hold" ? "green" : "red"
                            }}
                          >
                            <Typography variant="h4">HOLD</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item>
                  {this.state.stockdetailsloading == true ||
                    this.state.stockdetails.length == 0 ? (
                    <Loader.Audio sx={{ paddingLeft: "50%" }} />
                  ) : (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          {this.state.necessarykeys.map((key) => {
                            return (
                              <TableRow className={classes.allitems}>
                                <TableCell>{key}</TableCell>
                                <TableCell align="right">
                                  {this.state.stockdetails[key]}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <Tooltip
                    classes={{ tooltip: classes.tooltip }}
                    placement="bottom"
                    title={
                      <TableRow>
                        {this.state.otherkeys.map((key) => {
                          return (
                            <TableRow>
                              <TableCell>{key}</TableCell>
                              <TableCell align="right">
                                {this.state.stockdetails[key]}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableRow>
                    }
                    interactive
                  >
                    <Button variant="contained" color="primary">
                      more details
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            )}
          </div>
        )}

        {this.state.selectedCompany !== "" &&
          this.state.stockdetails.length !== 0 && (
            <Dashboard company={this.state.selectedCompany} key="dashboard" />
          )}
      </Root>
    );
  }
}

export default withRouter(CompanyDetails);
