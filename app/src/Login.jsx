import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "10%"
  }
}));

function Login({ email, setEmail }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        direction="row"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <form autoComplete="off">
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  error={Boolean(email)}
                  helperText="Please provide the email address where you received your invitation!"
                  type="email"
                  required
                />
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
