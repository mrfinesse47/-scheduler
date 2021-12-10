export function getAppointmentsForDay(state, day) {
  let aptNumArr = [];
  const appointmentsForDay = [];

  state.days.forEach((d) => {
    if (day === d.name) {
      aptNumArr = d.appointments;
    }
  });

  aptNumArr.forEach((appointment) => {
    if (state.appointments[appointment]) {
      appointmentsForDay.push({ ...state.appointments[appointment] }); //just incase it gets edited using ...
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
