import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import api from "./api";

function Admin() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => setPeople(await api.getPeople());
    fetchData();
  }, []);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Email Status</TableCell>
            <TableCell>Reservation Status</TableCell>
            <TableCell>Message Status</TableCell>
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
                <TableCell>{email.status}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{message.status}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Admin;
