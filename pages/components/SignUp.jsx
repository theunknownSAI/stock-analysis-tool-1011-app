import { Button, Grid, TextField, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, } from "react-router-dom";


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
      width: "180px"
    },
  }
}));

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("logged");
  }, []);

  const verifyAndCreate = () => {
    setSignupStatus("");

    const isValidFirstName = validator.isAlpha(firstName);
    const isValidLastName = validator.isAlpha(lastName);
    const isValidEmail = validator.isEmail(email);
    const isValidPassword = validator.isStrongPassword(password);

    const firstNameError =
      isValidFirstName == true ? "" : "only alphabets allowed";
    const lastNameError =
      isValidLastName == true ? "" : "only alphabets allowed";
    const emailError = isValidEmail == true ? "" : "invalid email";
    const passwordError =
      isValidPassword == true
        ? ""
        : "minLength=8, minLowercase=1, minUppercase=1, minNumbers=1, minSymbols=1";

    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setEmailError(emailError);
    setPasswordError(passwordError);

    const isvalid =
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword &&
      true;

    if (isvalid == false) {
      return;
    }

    let params =
      "email=" + email +
      "&" +
      "password=" + password +
      "&" +
      "firstName=" + firstName +
      "&" +
      "lastName=" + lastName;

    axios
      .get("/api/signup?" + params)
      .then((response) => {
        const message = response.data.message;
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setSignupStatus(message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Root className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography component="h6" variant="h6">
            {signupStatus}
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
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            error={firstNameError.length !== 0 ? true : false}
            helperText={firstNameError}
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
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            error={lastNameError.length !== 0 ? true : false}
            helperText={lastNameError}
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            error={emailError.length !== 0 ? true : false}
            helperText={emailError}
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={passwordError.length !== 0 ? true : false}
            helperText={passwordError}
            className={classes.helperText}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={verifyAndCreate}
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

export default SignUp;
