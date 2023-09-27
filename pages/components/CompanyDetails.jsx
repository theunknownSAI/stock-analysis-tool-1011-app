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
import React, { useEffect, useState } from "react";
import * as Loader from "react-loader-spinner";

import { withRouter } from "../../utils/WithRouter";
import Dashboard from "./Dashboard";

import { necessarykeys, otherkeys } from "../../utils/constants";
import { useParams } from "react-router-dom";

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

const CompanyDetails = () => {

  const storedCompanyDetails = localStorage.getItem("companyDetails");
  const storedcompanyCurrentDayStockDetails = localStorage.getItem("companyCurrentDayStockDetails");
  const storedSelectedCompany = localStorage.getItem("selectedCompany");
  const storedSuggest = localStorage.getItem("suggest");
  const storedStockdetails = localStorage.getItem("stockdetails");

  const [companyDetails, setCompanyDetails] = useState(storedCompanyDetails === undefined || storedCompanyDetails == null ? [] : JSON.parse(storedCompanyDetails));
  const [companyCurrentDayStockDetails, setCompanyCurrentDayStockDetails] = useState(storedcompanyCurrentDayStockDetails === undefined || storedcompanyCurrentDayStockDetails == null ? [] : JSON.parse(storedcompanyCurrentDayStockDetails));
  const [selectedCompany, setSelectedCompany] = useState(storedSelectedCompany === undefined || storedSelectedCompany == null ? "" : JSON.parse(storedSelectedCompany));
  const [companydetailsloading, setCompanydetailsloading] = useState(false);
  const [stockdetailsloading, setStockdetailsloading] = useState(false);
  const [suggest, setSuggest] = useState(storedSuggest === undefined || storedSuggest === null ? "" : JSON.parse(storedSuggest));
  const [stockdetails, setStockdetails] = useState(storedStockdetails === undefined || storedStockdetails === null ? [] : JSON.parse(storedStockdetails));

  const params = useParams();
  const { company } = params;

  useEffect = (() => {

    const prevcompany = JSON.parse(localStorage.getItem("selectedCompany"));

    if (prevcompany === company) {
      return;
    }

    setSelectedCompany(company);

    localStorage.setItem("selectedCompany", JSON.stringify(selectedCompany));
    getDetails(selectedCompany);
  }, [company]);

  const getDetails = async (company) => {
    getCompanyDetails(company);
    getStockDetails(company);
    getSuggestion(company);
  };

  const getCompanyDetails = async (company) => {
    setCompanydetailsloading(true);
    await axios
      .get("/api/companydetails?company=" + company)
      .then((s) => {
        if (s.status === 200) {
          let companyDetails = s.data;
          setCompanyDetails(companyDetails);
          setCompanydetailsloading(false);
          localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
        } else {
          setCompanyDetails([]);
          setCompanydetailsloading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setCompanyDetails([]);
        setCompanydetailsloading(false);
      });
  };

  const getStockDetails = async (company) => {
    setStockdetailsloading(true);
    await axios
      .get("/api/previousdaystockdetails?company=" + company)
      .then((s) => {
        if (s.status === 200) {
          setStockdetails(stockdetails);
          setStockdetailsloading(false);
          localStorage.setItem("stockdetails", JSON.stringify(stockdetails));

        } else {
          setStockdetails([]);
          setStockdetailsloading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setStockdetails([]);
        setStockdetailsloading(false);
      });
  };

  const getSuggestion = async (company) => {
    await axios
      .get("/api/suggest?company=" + company)
      .then((t) => {
        if (t.status === 200) {
          let suggest = t.data["suggest"];
          if (suggest.length === 0) {
            suggest = "hold";
          }
          setSuggest(suggest);
          localStorage.setItem("suggest", JSON.stringify(suggest));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Root className={classes.root}>
      {selectedCompany !== "" && (
        <div>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4">
              {selectedCompany}
            </Typography>
          </Paper>
          <Divider />
          {companydetailsloading === true ? (
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
                      {Object.keys(companyDetails).map((key) => {
                        if (companyDetails[key] === null) {
                          return <span key={key.toString()}></span>;
                        }
                        return (
                          <TableRow className={classes.allitems}>
                            <TableCell>{key}</TableCell>
                            <TableCell align="right">
                              {companyDetails[key]}
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
                              suggest == "sell" ? "green" : "red"
                          }}
                        >
                          <Typography variant="h4">SELL</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            background:
                              suggest == "buy" ? "green" : "red"
                          }}
                        >
                          <Typography variant="h4">BUY</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            background:
                              suggest == "hold" ? "green" : "red"
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
                {stockdetailsloading == true ||
                  stockdetails.length == 0 ? (
                  <Loader.Audio sx={{ paddingLeft: "50%" }} />
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {necessarykeys.map((key) => {
                          return (
                            <TableRow className={classes.allitems}>
                              <TableCell>{key}</TableCell>
                              <TableCell align="right">
                                {stockdetails[key]}
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
                      {otherkeys.map((key) => {
                        return (
                          <TableRow>
                            <TableCell>{key}</TableCell>
                            <TableCell align="right">
                              {stockdetails[key]}
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

      {selectedCompany !== "" &&
        stockdetails.length !== 0 && (
          <Dashboard company={selectedCompany} key="dashboard" />
        )}
    </Root>
  );
}

export default withRouter(CompanyDetails);
