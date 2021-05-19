/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { observable } from "mobx";

import checkbox from "./checkbox";

export default (context) => {
  const { tr } = context;
  const Checkbox = checkbox(context);

  const store = observable({
    map: observable.map(),
  });

  const CheckboxContainer = styled("div")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;

  return function CheckBoxExamples() {
    return (
      <section id="checkbox">
        <h1>{tr.t("Checkbox")}</h1>
        <form
          css={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <CheckboxContainer>
            <Checkbox
              id="myCheckbox"
              name="myCheckbox"
              value={store.map.get("myCheckbox") || false}
              onChange={(evt) => {
                store.map.set(evt.target.name, evt.target.checked);
              }}
            />
            <label htmlFor="myCheckbox">My Checkbox</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              id="autoplay"
              name="autoplay"
              value={store.map.get("myCheckbox") || ""}
              onChange={(evt) => {
                store.map.set(evt.target.name, evt.target.checked);
              }}
            />
            <label htmlFor="autoplay">Autoplay</label>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              id="disabled"
              disabled
              name="myCheckbox"
              value={store.map.get("myCheckbox") || ""}
              onChange={(evt) => {
                store.map.set(evt.target.name, evt.target.checked);
              }}
            />
            <label htmlFor="disabled">Disabled</label>
          </CheckboxContainer>
        </form>
      </section>
    );
  };
};
