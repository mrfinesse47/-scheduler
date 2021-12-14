import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const WANTS_DELETING = "WANTS_DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
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

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function deleteInterview(id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  function wantsToDeleteInterview() {
    transition(WANTS_DELETING, true);
  }

  function editInterview() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === ERROR_SAVE && (
        <Error
          message={"Something went wrong on creation"}
          onClose={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Something went wrong on deletion"}
          onClose={() => {
            transition(CREATE);
          }}
        />
      )}

      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={wantsToDeleteInterview}
          onEdit={() => editInterview(props.id)}
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
      {mode === EDIT && (
        <Form
          bookInterview={props.bookInterview}
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message="saving appointment" />}
      {mode === DELETING && <Status message={"deleting appointment"} />}
      {mode === WANTS_DELETING && (
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
