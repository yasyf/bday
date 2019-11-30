import React, { useState, useEffect } from "react";
import queryString from "query-string";

import Login from "./Login";
import Landing from "./Landing";
import RSVP from "./RSVP";
import api from "./api";

function Home({ location }) {
  const { email: emailFromQuery } = queryString.parse(location.search);
  const initialEmail = emailFromQuery || localStorage.getItem("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (!email) return;
    const fetchData = async () => {
      const person = await api.findPerson(email);
      if (!person) return;
      setPerson(person);
      localStorage.setItem("email", email);
    };
    fetchData();
  }, [email]);

  if (!person) {
    return <Login email={email} setEmail={setEmail} />;
  }
  if (["committed", "confirmed", "rejected"].includes(person.status)) {
    return <RSVP person={person} setPerson={setPerson} />;
  }
  return <Landing person={person} setPerson={setPerson} />;
}

export default Home;
