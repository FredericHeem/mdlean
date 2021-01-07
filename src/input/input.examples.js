/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable } from "mobx";
import input from "./input";

export default (context) => {
  const { tr } = context;
  const store = observable({
    map: observable.map(),
  });

  const Input = input(context);

  return function InputExamples() {
    return (
      <section id="input">
        <h1>{tr.t("Input")}</h1>
        <form
          css={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <Input
            label="Username"
            name="username"
            autoComplete="username"
            value={store.map.get("username") || ""}
            onChange={(evt) => {
              store.map.set(evt.target.name, evt.target.value);
            }}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={store.map.get("password") || ""}
            onChange={(evt) => {
              store.map.set(evt.target.name, evt.target.value);
            }}
          />
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: row;
              > div {
                margin-right: 10px;
              }
            `}
          >
            <Input
              label="Input with value"
              styles={css`
                input {
                  width: 250px;
                }
              `}
            />
            <Input
              label="AutoFocus"
              autoFocus
              styles={css`
                width: 200px;
              `}
              onChange={(evt) => {}}
            />
          </div>
          <Input disabled label="Disabled" />
          <Input
            disabled
            label="Disable with value"
            value="myValue"
            onChange={(evt) => {}}
          />

          <Input label="3 " />
          <Input
            label="Error"
            error="error displayed here"
            value="abc"
            onChange={(evt) => {}}
          />
        </form>
      </section>
    );
  };
};
