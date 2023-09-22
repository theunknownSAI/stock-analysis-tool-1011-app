import { Button, Grid, TextField, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React from "react";
import { NavLink, } from "react-router-dom";

import { withRouter } from "../../utils/WithRouter";

import validator from "validator";

const PREFIX = "SignUp";

const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  submit: `${PREFIX}-submit`,
  helperText: `${PREFIX}-helperText`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    padding: "25px",
    textAlign: "center",
    margin: "25px",
  },
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
  [`& .${classes.helperText}`]: {
    "& .MuiFormHelperText-root": {
      display: "flex",
      justifyContent: "flex-end",
      width:"180px"
    },
  }
}));

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      signupstatus: "",
    };
  }
  componentDidMount = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
  };

  verifyAndCreate = () => {
    this.setState({ signupstatus: "" }, () => {});
    const isValidFirstName = validator.isAlpha(this.state["firstName"]);
    const isValidLastName = validator.isAlpha(this.state["lastName"]);
    const isValidEmail = validator.isEmail(this.state["email"]);
    const isValidPassword = validator.isStrongPassword(this.state["password"]);

    const firstNameError =
      isValidFirstName == true ? "" : "only alphabets allowed";
    const lastNameError =
      isValidLastName == true ? "" : "only alphabets allowed";
    const emailError = isValidEmail == true ? "" : "invalid email";
    const passwordError =
      isValidPassword == true
        ? ""
        : "minLength=8, minLowercase=1, minUppercase=1, minNumbers=1, minSymbols=1";
    this.setState(
      {
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
      },
      () => {}
    );

    const isvalid =
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword &&
      true;

    if (isvalid == false) {
      return;
    }
    const prevemail = JSON.parse(localStorage.getItem("email"));
    const prevpassword = JSON.parse(localStorage.getItem("password"));
    if (prevemail == email && prevpassword == password) {
      localStorage.setItem("logged", JSON.stringify(true));
      return;
    }
    let params =
      "email=" +
      this.state.email +
      "&" +
      "password=" +
      this.state.password +
      "&" +
      "firstName=" +
      this.state.firstName +
      "&" +
      "lastName=" +
      this.state.lastName;

    axios
      .get("/api/signup?" + params)
      .then((s) => {
        this.setState(
          {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            signupstatus: s.data["status"],
          },
          () => {}
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const logged = JSON.parse(localStorage.getItem("logged"));
    return (
      <Root className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography component="h6" variant="h6">
              {this.state.signupstatus}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              autoComplete="fname"
              margin="normal"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={this.state.firstName}
              onChange={(e) => {
                this.setState({ firstName: e.target.value });
              }}
              error={this.state.firstNameError.length !== 0 ? true : false}
              helperText={this.state.firstNameError}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={this.state.lastName}
              onChange={(e) => {
                this.setState({ lastName: e.target.value });
              }}
              error={this.state.lastNameError.length !== 0 ? true : false}
              helperText={this.state.lastNameError}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              error={this.state.emailError.length !== 0 ? true : false}
              helperText={this.state.emailError}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              error={this.state.passwordError.length !== 0 ? true : false}
              helperText={this.state.passwordError}
              className = {classes.helperText}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.verifyAndCreate}
            >
            Sign Up
            </Button>
          </Grid>
          <Grid item>
            <NavLink to="/login" sx={{ color: "blue" }}>
              <Typography variant="h6" sx={{ color: "blue" }}>
                {"Already have an account? Sign in"}
              </Typography>
            </NavLink>
          </Grid>
        </Grid>
      </Root>
    );
  }
}

export default withRouter(SignUp);
