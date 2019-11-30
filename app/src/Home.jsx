import React, { useState, useEffect } from "react";
import queryString from "query-string";

import Login from "./Login";
import Landing from "./Landing";
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

  if (!person) return <Login email={email} setEmail={setEmail} />;
  return <Landing person={person} />;
}

export default Home;
