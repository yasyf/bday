import React, { useState, useEffect } from "react";
import { reject, find } from "lodash";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";
import api from "./api";

function Admin() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => setPeople(await api.getPeople());
    fetchData();
  }, []);

  const awaitAndSetPerson = async promise => {
    const person = await promise;
    const newPeople = [person].concat(reject(people, { id: person.id }));
    setPeople(newPeople);
  };

  const copyMessage = id => {
    const { emailAddress } = find(people, { id });
    const message = `Hey! Just shot an an email to ${emailAddress} re: my birthday :) Take a look when you get a chance!`;
    navigator.permissions
      .query({ name: "clipboard-write" })
      .then(() => navigator.clipboard.writeText(message));
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Flight</TableCell>
            <TableCell>Email Status</TableCell>
            <TableCell>Reservation Status</TableCell>
            <TableCell>Message Status</TableCell>
            <TableCell>Send Email</TableCell>
            <TableCell>Send Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map(
            ({
              id,
              firstName,
              lastName,
              status,
              email,
              reservation,
              message
            }) => (
              <TableRow key={id}>
                <TableCell>
                  {firstName} {lastName}
                </TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{reservation.flightNumber}</TableCell>
                <TableCell>{email.status}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{message.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => awaitAndSetPerson(api.sendEmail(id))}
                  >
                    Send Email
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      copyMessage(id);
                      awaitAndSetPerson(api.sendMessage(id));
                    }}
                  >
                    Send Message
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Admin;
