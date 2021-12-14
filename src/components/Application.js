import React from "react";
import useApplicationData from "../hooks/useApplicationData";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  getRemainingAppointmentsForDays,
} from "helpers/selectors";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const InterviewersForDay = getInterviewersForDay(state, state.day);

  const remainingAppointments = getRemainingAppointmentsForDays(state);

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            remainingAppointments={remainingAppointments}
          />
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
                interview={interview}
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
            interview={getInterview(state, dailyAppointments[4])}
          />
        </ul>
      </section>
    </main>
  );
}
