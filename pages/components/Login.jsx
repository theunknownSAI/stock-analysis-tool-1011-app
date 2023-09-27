import { Button, Grid, TextField, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, } from "react-router-dom";
import validator from "validator";

const PREFIX = "Login";
const theme = createTheme();

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
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
  [`& .${classes.form}`]: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const Login = () => {

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [loginStatus, setLoginStatus] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("logged");
  }, []);

  const verifyAndLogin = async () => {

    setLoginStatus("");

    const isValidEmail = validator.isEmpty(email);
    const isValidPassword = validator.isEmpty(password);
    const emailError = isValidEmail ? "email cannot be empty" : "";
    const passwordError = isValidPassword ? "password cannot be empty" : "";

    setEmailError(emailError);
    setPasswordError(passwordError);

    const isValid = !isValidEmail && !isValidPassword;

    if (!isValid) {
      return;
    }

    await axios
      .get("/api/signin?" + "email=" + email + "&" + "password=" + password)
      .then((response) => {
        const { data } = response;
        const { details } = data;
        localStorage.setItem("firstName", JSON.stringify(details.firstName));
        localStorage.setItem("lastName", JSON.stringify(details.lastName));
        localStorage.setItem("email", JSON.stringify(details.email));
        localStorage.setItem("logged", JSON.stringify(true));
        navigate("/");

      })
      .catch((error) => {
        const { response } = error;
        const { data } = response;
        setLoginStatus(data.message);
        localStorage.setItem("logged", JSON.stringify(false));
        console.log(error);
      });
  };

  const logged = JSON.parse(localStorage.getItem("logged"));
  return (
    <Root className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography component="h6" variant="h6">{loginStatus}</Typography>
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
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={verifyAndLogin}
          >
            Sign In
          </Button>
        </Grid>
        <Grid item>
          <NavLink to="/signup" >
            <Typography variant="h6" sx={{ color: "blue" }}>
              {"Create Account"}
            </Typography>
          </NavLink>
        </Grid>
      </Grid>
    </Root>
  );
}

export default Login;
