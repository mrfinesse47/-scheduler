import _ from "lodash";

export function getAppointmentsForDay(state, day) {
  let aptNumArr = [];
  const appointmentsForDay = [];
  const newState = _.cloneDeep(state); //bug fix

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
  //always making a copy of state to be safe

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
      interviewersForDay.push({ ...state.interviewers[interviewer] }); //just incase it gets edited using ...
    }
  });

  return interviewersForDay;
}

export function getRemainingAppointmentsForDays(state) {
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
