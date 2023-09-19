import GitHubIcon from "@mui/icons-material/GitHub";
import { Avatar, Grid, Link, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import clsx from "clsx";
import React from "react";

const theme = createTheme();
const PREFIX = "About";

const classes = {
  root: `${PREFIX}-root`,
  large: `${PREFIX}-large`,
  color: `${PREFIX}-color`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
    margin: "10px",
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
      <Root className={classes.root}>
        <Typography
          variant="h4"
          align="center"
          sx ={{color: "#0D19A3"}}
        >
          About Us
        </Typography>
        <Typography variant="h6" align="left">
          <span sx = {{
              backgroundColor: "#15DB95", 
              color: "#0D19A3"
            }}>
            Stock Vestor
          </span>{" "}
          is a tool for investors to optimize their returns of the given
          company in midterm investments. This tool considers each stock,
          understands the trend of the stock for short and longer periods,
          evaluates volatility and risk of the stock, assesses the effect of
          market sentiment and corporate actions on the stock and advise
          investors on entry and exit of that stock.
        </Typography>
        <Typography variant="h6" align="left" sx = {{marginTop: "20px"}}>
          We are a team of analytics experts who utilize their skills in both
          technology find trends and manage data.
        </Typography>
        <Typography
          variant="h4"
          sx = {{ 
            marginTop: "20px",
            marginBottom: "20px",
            color: "#0D19A3",
          }}
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
      </Root>
    );
  }
}

export default About;
