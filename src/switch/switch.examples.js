/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { observable } from "mobx";

import createSwitch from "./switch";

export default context => {
  const { tr } = context;
  const Switch = createSwitch(context);

  const store = observable({
    map: observable.map()
  });

  const SwitchContainer = styled("div")`
    display: flex;
    align-items: center;
    label {
      margin-left: 1rem;
    }
  `;

  return function SwitchExamples() {
    return (
      <section id="switch">
        <h1>{tr.t("Switch")}</h1>
        <form
          css={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <Switch
            name="mySwitch"
            value={store.map.get("mySwitch") || ""}
            onChange={evt => {
              store.map.set(evt.target.name, evt.target.checked);
            }}
          />
        </form>
      </section>
    );
  };
};
