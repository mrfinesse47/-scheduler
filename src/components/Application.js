import React from "react";

import Button from "./Button";

import "components/Application.scss";

export default function Application(props) {
  const clickHandler = () => {
    console.log("button-clicked");
  };
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        <Button onClick={clickHandler} disabled={false}>
          Default
        </Button>
      </section>
    </main>
  );
}
