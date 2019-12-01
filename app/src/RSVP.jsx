import React, { useCallback, useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField
} from "@material-ui/core";

import api from "./api";

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

function RSVP({ person: { id, status, reservation }, setPerson }) {
  const classes = useStyles();
  const [flightNumber, setFlightNumber] = useState(
    reservation.flightNumber || ""
  );

  const awaitAndSetPerson = async update => {
    const person = await api.updatePerson(id, update);
    setPerson(person);
  };

  const patchYes = useCallback(() => {
    awaitAndSetPerson({ committed: true });
  }, [id, setPerson]);

  const patchNo = useCallback(() => {
    awaitAndSetPerson({ committed: false });
  }, [id, setPerson]);

  useEffect(() => {
    awaitAndSetPerson({ flightNumber });
  }, [flightNumber]);

  const isYes = ["committed", "confirmed"].includes(status);

  const initialQuestion = (
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
              Can you attend Yasyf's birthday weekend in Hawaii (01/31 - 02/02)?
            </Typography>
            <br />
            <Grid
              container
              justify="center"
              direction="row"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={2}>
                <Button
                  size="large"
                  variant={status === "rejected" ? "outlined" : "contained"}
                  color="primary"
                  onClick={patchYes}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  size="large"
                  variant={
                    ["committed", "confirmed"].includes(status)
                      ? "outlined"
                      : "contained"
                  }
                  color="secondary"
                  onClick={patchNo}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const followupQuestions = (
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
              What is your outbound flight number?
            </Typography>
            <br />
            <Grid
              container
              justify="center"
              direction="row"
              alignItems="center"
              spacing={3}
            >
              <TextField
                label="Flight Number"
                value={flightNumber}
                onChange={e => setFlightNumber(e.target.value)}
                helperText="e.g. AS 743"
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.root}>
      {initialQuestion}
      <br />
      {isYes ? followupQuestions : null}
    </div>
  );
}

export default RSVP;
