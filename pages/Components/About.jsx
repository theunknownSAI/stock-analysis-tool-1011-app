import GitHubIcon from "@mui/icons-material/GitHub";
import { Avatar, Grid, Link, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import clsx from "clsx";
import React from "react";

const PREFIX = "About";

const classes = {
  typo1: `${PREFIX}-typo1`,
  typo2: `${PREFIX}-typo2`,
  typo3: `${PREFIX}-typo3`,
  typo4: `${PREFIX}-typo4`,
  large: `${PREFIX}-large`,
  color: `${PREFIX}-color`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.typo1}`]: {
      color: "#0D19A3",
  },
  [`& .${classes.typo2}`]: {
      backgroundColor: "#15DB95", 
      color: "#0D19A3"
  },
  [`& .${classes.typo3}`]: {
      marginTop: "20px"
  },
  [`& .${classes.typo4}`]: {
    marginTop: "20px",
    marginBottom: "20px",
    color: "#0D19A3",
  },
  [`& .${classes.large}`]: {
    width: 50,
    height: 50,
  },
  [`& .${classes.color}`]: {
    color: "#ffffff",
    backgroundColor: "#FF8C00",
  }
}));


class About extends React.Component {
  componentDidMount = () => {
    console.log("About");
  };

  render() {
    return (
      <Root>
         <div
         sx={{
          padding: "25px",
          margin: "10px",
        }}>
          <Typography
            variant="h4"
            align="center"
            className={classes.typo1}
          >
            About Us
          </Typography>
          <Typography variant="h6" align="left">
            <span className={classes.typo2}>
              Stock Vestor
            </span>{" "}
            is a tool for investors to optimize their returns of the given
            company in midterm investments. This tool considers each stock,
            understands the trend of the stock for short and longer periods,
            evaluates volatility and risk of the stock, assesses the effect of
            market sentiment and corporate actions on the stock and advise
            investors on entry and exit of that stock.
          </Typography>
          <Typography variant="h6" align="left" className={classes.typo3}>
            We are a team of analytics experts who utilize their skills in both
            technology find trends and manage data.
          </Typography>
          <Typography
            variant="h4"
            className={classes.typo4}
            align="center"
          >
            Team
          </Typography>
          <Grid
            container
            direction="column"
            spacing={3}
            justify="center"
            alignItems="center"
          >
            <Grid container item spacing={3}>
              <Grid item>
                <Avatar
                  className={clsx(classes.large, classes.color)}
                  alt="Venu Gopal Jilla"
                  src="/images/venu.png"
                >
                  <Typography variant="h2" component="h2">
                    V
                  </Typography>
                </Avatar>
              </Grid>
              <Grid item>
                <Link href="https://github.com/VenuGopalJilla">
                  <Avatar className={clsx(classes.large)}>
                    <GitHubIcon color="disabled" fontSize="large" />
                  </Avatar>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h4">
                  Venu Gopal Jilla
                </Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
              <Grid item>
                <Avatar
                  className={clsx(classes.large, classes.color)}
                  alt="Venkata Sai Krishna Nama"
                  src="/images/sai.png"
                >
                  <Typography variant="h2" component="h2">
                    V
                  </Typography>
                </Avatar>
              </Grid>
              <Grid item>
                <Link href="https://www.github.com/saikr789">
                  <Avatar className={clsx(classes.large)}>
                    <GitHubIcon color="disabled" fontSize="large" />
                  </Avatar>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h4">
                  Venkata Sai Krishna Nama
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          </div>
      </Root>
    );
  }
}

export default About;
