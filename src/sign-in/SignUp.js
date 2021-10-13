import React, { useState } from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Copyright from "../base/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [emailValue, setEmailValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [confimValue, setConfimValue] = useState("");

  const reg_email =
    /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  const signUpPost = (e) => {
    e.preventDefault();
    console.log(`email: ${emailValue}`);
    console.log(`pw: ${pwValue}`);
    console.log(`confirm: ${confimValue}`);

    if (emailValue === "") {
      alert("Please enter your email.");
    } else if (!reg_email.test(emailValue)) {
      alert("Check your email.");
    } else if (pwValue === "" || confimValue === "") {
      alert("Please enter your password and confirm.");
    } else if (pwValue === confimValue) {
      axios
        .post("https://api.cumulus.tophat.cloud/member", {
          email: emailValue,
          password: pwValue,
        })
        .then(function (response) {
          // console.log(response);
          alert("Sign-up is completed! Please sign-in to use cumulus.");
          window.location.pathname = "/signin"; // 로그인 페이지로 이동
        })
        .catch(function (error) {
          console.log(error.response);
          alert(error.response["data"]["message"]);
          // alert(`회원가입 중 에러가 발생했습니다: ${error}`);
          // console.log(error);
        })
        .then(function () {
          // console.log("항상 실행");
        });
    } else {
      alert(
        "[Password verification error] Please input your correct password and try again."
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmailValue(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPwValue(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm"
                label="Confirm"
                type="password"
                id="confirm"
                autoComplete="current-password"
                onChange={(event) => setConfimValue(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              signUpPost(e);
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
