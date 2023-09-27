import { Paper, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";

const PREFIX = "Revenue";
const theme = createTheme();
const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  navlink: `${PREFIX}-navlink`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
  },
  [`& .${classes.paper}`]: {
    display: "flex",
    padding: "15px",
    justifyContent: "center",
    backgroundColor: "inherit",
    "&:hover": {
      backgroundColor: "#15DB95",
      color: "#0D19A3",
    }
  },
  [`& .${classes.navlink}`]: {
    textDecoration: "none",
  }
}));

const Revenue = () => {

  const [topCompaniesRevenue, setTopCompaniesRevenue] = useState([]);
  const [num, setNum] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStockDetails = async () => {
      await getpreviousdaystockdetails();
    };
    fetchStockDetails();
  }, []);

  const getpreviousdaystockdetails = async () => {

    setLoading(true);

    await axios
      .get("/api/previousdaystockdetails")
      .then((response) => {
        if (response.status === 200) {
          let companyStockDetails = response.data.details;
          companyStockDetails.sort((a, b) => {
            return a["Revenue"] - b["Revenue"];
          });
          companyStockDetails = companyStockDetails.slice(0, num);
          let topCompaniesRevenuedetails = [];
          for (let index = 0; index < companyStockDetails.length; index++) {
            const element = companyStockDetails[index];
            topCompaniesRevenuedetails.push(element["Company"]);
          }
          setTopCompaniesRevenue(topCompaniesRevenuedetails);
          setLoading(false);
        } else {
          setTopCompaniesRevenue([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setTopCompaniesRevenue([]);
        setLoading(false);
      });
  }
  return (
    <Root className={classes.root}>
      {loading ? (
        <Loader.Audio sx={{ paddingLeft: "50%" }} />
      ) : (
        <div>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h4">
              Top {num} Companies Revenue wise
            </Typography>
          </Paper>
          {topCompaniesRevenue.map((company) => {
            return (
              <NavLink
                className={classes.navlink}
                key={company.toString()}
                to={{
                  pathname: "/companydetails/" + company,
                }}
              >
                <Paper elevation={0} className={classes.paper}>
                  <Typography variant="h6">{company}</Typography>
                </Paper>
              </NavLink>
            );
          })}
        </div>
      )}
    </Root>
  );
}

export default Revenue;
