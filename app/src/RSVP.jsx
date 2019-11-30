import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "10%",
    paddingBottom: 0
  },
  question: {
    textAlign: "center"
  }
}));

function RSVP({ email, setEmail }) {
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
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.question}
              >
                Can you attend Yasyf's birthday weekend in Hawaii (01/31 -
                02/02)?
              </Typography>
              <br />
              <Grid
                container
                justify="center"
                direction="row"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={3}>
                  <Button size="large" variant="contained" color="primary">
                    Yes
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button size="large" variant="contained" color="secondary">
                    No
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default RSVP;
