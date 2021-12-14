import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteInterview(id) {
    transition(SAVING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  function wantsToDeleteInterview(id) {
    transition(DELETING);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            console.log("Clicked onAdd");
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={wantsToDeleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          bookInterview={props.bookInterview}
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === DELETING && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => deleteInterview(props.id)}
          onCancel={() => transition(SHOW)}
        />
      )}
    </article>
  );
};

export default Appointment;

// onSave={action("onSave")}
// onCancel={action("onCancel")}
