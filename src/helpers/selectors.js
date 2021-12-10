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
