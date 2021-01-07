/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { observer } from "mobx-react";
import hello from "./hello";
import * as faker from "faker";

export default (context) => {
  const { tr } = context;
  const Hello = hello(context);

  return observer(function () {
    return (
      <section id="hello">
        <h1>{tr.t("Hello")}</h1>
        <Hello />
      </section>
    );
  });
};
