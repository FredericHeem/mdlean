import * as React from "react";
import alert from "./alert";

export default (context) => {
  const { tr } = context;
  const Alert = alert(context);
  return function AlertExamples() {
    return (
      <section id="alert">
        <h3>{tr.t("Alert")}</h3>
        <Alert
          severity="error"
          name="Trouble Ahead"
          message="Something went wrong"
        />
        <Alert
          severity="warning"
          message="Alert warning"
          onRemove={(event) => {
            // alert("Reomved");
            event.preventDefault();
          }}
        />
        <Alert
          severity="info"
          message="Alert info message"
          name="My Title"
          code="500"
        />
        <Alert
          severity="success"
          message="Alert success message"
          name="My Title"
          code="500"
        />
      </section>
    );
  };
};
