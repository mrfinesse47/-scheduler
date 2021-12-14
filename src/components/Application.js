import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  function bookInterview(id, interview) {
    console.log("#####", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(appointments);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        const newState = { ...state };
        newState.appointments[id].interview = null;

        setState(newState);
      })
      .catch((err) => {
        console.log("err");
      });
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

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
