import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

//1 spot remaining
//no spots remaining
//2 sports remaining

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots";
    }
    if (spots === 1) {
      return "1 spot";
    }
    return `${spots} spots`;
  };

  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  console.log(dayListItemClass);
  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
