import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  console.log(props);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            // id={interviewer.id}
            avatar={interviewer.avatar}
            name={interviewer.name}
            selected={interviewer.id === props.interviewer}
            setInterviewer={() => props.setInterviewer(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
