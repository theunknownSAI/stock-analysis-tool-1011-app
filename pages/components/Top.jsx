import { Paper, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Loader from "react-loader-spinner";
import { NavLink, useParams } from "react-router-dom";

const PREFIX = "Top";
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
    },
  },
  [`& .${classes.navlink}`]: {
    textDecoration: "none",
  }
}));

const Top = () => {

  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState("");
  const [type, setType] = useState("");

  const [topCompanies, setTopCompanies] = useState([]);

  const params = useParams();
  const paramNum = params.num;
  const paramType = params.type;

  useEffect(() => {
    setLoading(true);
    setNum(paramNum);
    setType(paramType);
    getTopCompanies();
  }, [paramNum, paramType]);

  const getTopCompanies = async () => {
    await axios
      .get("/api/top?type=" + paramType + "&" + "num=" + paramNum)
      .then((response) => {
        if (response.status === 200) {
          let { data } = response;
          let { details } = data;
          let topCompanies = details;
          setLoading(false);
          setTopCompanies(topCompanies);
          localStorage.setItem("topCompanies", JSON.stringify(topCompanies));
        } else {
          setLoading(false);
          setTopCompanies([]);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setTopCompanies([]);
      });
  }

  return (
    <Root className={classes.root}>
      {loading ? (
        <Loader.Audio sx={{ paddingLeft: "50%" }} />
      ) : (
        <div sx={{ backgroundColor: "inherit" }}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h4">
              Top {num} Companies for{" "}
              {type === "buy" ? "Investing" : "Trading"}
            </Typography>
          </Paper>
          {topCompanies.map((company) => {
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

export default Top;
