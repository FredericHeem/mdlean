/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable } from "mobx";
import { observer } from "mobx-react";

export default ({ theme: { palette } }) => {
  const style = {
    base: css``
  };

  const Form = observer(({ children }) => {
    return <form>{children}</form>;
  });
  return Form;
};
