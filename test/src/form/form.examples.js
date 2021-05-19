/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observer } from "mobx-react";
import formLogin from "./examples/form.login";
export default (context) => {
  const { tr } = context;
  const FormLogin = formLogin(context);

  return observer(function () {
    return (
      <section id="form">
        <h1>{tr.t("Login Form")}</h1>
        <FormLogin />
      </section>
    );
  });
};
