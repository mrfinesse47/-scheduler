import React from "react";
import useApplicationData from "../hooks/useApplicationData";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const InterviewersForDay = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {dailyAppointments.map((apt) => {
            const interview = getInterview(state, apt.interview);
            return (
              <Appointment
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
                key={apt.id}
                {...apt}
                interviewers={InterviewersForDay}
              />
            );
          })}
          <Appointment
            key="last"
            time="5pm"
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            interviewers={InterviewersForDay}
          />
        </ul>
      </section>
    </main>
  );
}
