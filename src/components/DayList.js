import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day, index) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={props.remainingAppointments[index]}
          selected={day.name === props.value}
          setDay={props.onChange}
        />
      ))}
    </ul>
  );
}
