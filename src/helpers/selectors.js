import _ from "lodash";

export function getAppointmentsForDay(state, day) {
  let aptNumArr = [];
  const appointmentsForDay = [];
  const newState = _.cloneDeep(state); //had to clone deep due to weird behaviour otherwise,
  //interviewer name would sometimes go missing each render on SHOW

  newState.days.forEach((d) => {
    if (day === d.name) {
      aptNumArr = d.appointments;
    }
  });

  aptNumArr.forEach((appointment) => {
    if (newState.appointments[appointment]) {
      appointmentsForDay.push(newState.appointments[appointment]);
    }
  });

  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  interview.interviewer = { ...state.interviewers[interview.interviewer] };

  //returns an interview object
  return interview;
}

export function getInterviewersForDay(state, day) {
  let interviewerNumArr = [];
  const interviewersForDay = [];

  state.days.forEach((d) => {
    if (day === d.name) {
      interviewerNumArr = d.interviewers;
    }
  });

  interviewerNumArr.forEach((interviewer) => {
    if (state.appointments[interviewer]) {
      interviewersForDay.push({ ...state.interviewers[interviewer] }); //just incase it gets edited, so I am using ...
    }
  });

  return interviewersForDay;
}

export function getRemainingAppointmentsForDays(state) {
  //will decrement from this array representing mon-fri, index 0-4
  //this array will be sent to day list to show remaining spots
  //this function will be called each render, ie each state change.

  const appointmentsRemaining = [5, 5, 5, 5, 5];

  state.days.forEach((day, index) => {
    day.appointments.forEach((appointment) => {
      if (state.appointments[appointment].interview) {
        appointmentsRemaining[index]--;
      }
    });
  });

  return appointmentsRemaining;
}
