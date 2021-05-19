/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observer } from "mobx-react";
import button from "../button";
import alert from "../alert";

export default (context) => {
  const { tr, alertStack } = context;

  const AlertStack = alertStack.View;
  const Button = button(context);
  const Alert = alert(context);

  return observer(function () {
    return (
      <section id="alert-stack">
        <AlertStack />
        <h1>{tr.t("Alert Stack")}</h1>
        <Button
          label="success alert"
          raised
          onClick={() => {
            alertStack.add(
              <Alert
                severity="success"
                message={tr.t("Infrastructure Created")}
              />
            );
          }}
        />
        <Button
          label="info alert"
          raised
          onClick={() => {
            alertStack.add(
              <Alert severity="info" message={tr.t("Something went wrong")} />
            );
          }}
        />
        <Button
          label="warning alert"
          raised
          onClick={() => {
            alertStack.add(
              <Alert
                severity="warning"
                message={tr.t("Peggy went to the market")}
              />
            );
          }}
        />
        <Button
          label="error alert"
          raised
          onClick={() => {
            alertStack.add(
              <Alert severity="error" message={tr.t("Something went wrong")} />
            );
          }}
        />
      </section>
    );
  });
};
