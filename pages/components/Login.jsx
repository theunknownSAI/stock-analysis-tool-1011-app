import { Button, Grid, TextField, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import axios from "axios";
import React from "react";
import { NavLink, } from "react-router-dom";
import validator from "validator";
import { withRouter } from "../../utils/WithRouter";

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: JSON.parse(localStorage.getItem("email")) || "",
      password: JSON.parse(localStorage.getItem("password")) || "",
      loginstatus: "",
      emailError: "",
      passwordError: "",
    };
  }
  componentDidMount = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
  };

  verifyAndLogin = () => {
    
    this.setState({ loginstatus: "" }, () => {});
    const { router } = this.props;
    const { navigate } = router;

    const { email, password } = this.state;
    const prevemail = JSON.parse(localStorage.getItem("email"));
    const prevpassword = JSON.parse(localStorage.getItem("password"));
    if (prevemail == email && prevpassword == password) {
      localStorage.setItem("logged", JSON.stringify(true));
      return;
    }
    const isValidEmail = validator.isEmpty(this.state["email"]);
    const isValidPassword = validator.isEmpty(this.state["password"]);
    const emailError = isValidEmail == false ? "" : "email cannot be empty";
    const passwordError =
      isValidPassword == false ? "" : "password cannot be empty";

    this.setState(
      {
        emailError,
        passwordError,
      },
      () => {}
    );

    const isvalid = isValidEmail == false && isValidPassword == false;

    if (isvalid == false) {
      return;
    }
    axios
      .get("/api/signin?" + "email=" + email + "&" + "password=" + password)
      .then((s) => {
        if (s["data"]["status"].indexOf("success") !== -1) {
          const details = s["data"]["details"];
          localStorage.setItem("firstName", JSON.stringify(details["firstName"]));
          localStorage.setItem("lastName", JSON.stringify(details["lastName"]));
          localStorage.setItem("email", JSON.stringify(details["email"]));
          localStorage.setItem("logged", JSON.stringify(true));
          navigate("/");
        } else {
          this.setState({ loginstatus: s["data"]["status"] }, () => {});
          localStorage.setItem("logged", JSON.stringify(false));
        }
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
            <Typography component="h6" variant="h6">{this.state.loginstatus}</Typography>
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
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.verifyAndLogin}
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
}

export default withRouter(Login);
