/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observer } from "mobx-react";
import { observable, action, keys } from "mobx";
import form from "../form";
import input from "../../input";
import button from "../../button";

export default context => {
  const {
    tr,
    theme: { shadows }
  } = context;

  const Input = input(context, {
    cssOverride: css`
      width: 100%;
      input {
        width: 100%;
      }
    `
  });

  const Button = button(context, {
    cssOverride: css`
      width: 100%;
    `
  });

  const validators = {
    username: (username = "") => {
      if (username.length < 2) {
        return "Username too short";
      }
    },
    password: (password = "") => {
      if (password.length < 6) {
        return "Password too short";
      }
    }
  };

  const store = observable({
    map: observable.map({
      username: "",
      password: ""
    }),
    mapError: observable.map(),
    get isValid() {
      return keys(store.map).every(
        name => !validators[name](store.map.get(name))
      );
    },

    login: action(async () => {
      console.log("login");
      const payload = {};
      //store.errorMessage = "TODO";
    })
  });

  const onChange = evt => {
    store.map.set(evt.target.name, evt.target.value);
  };

  const onFocus = evt => {
    store.mapError.delete(evt.target.name);
  };

  const onBlur = evt => {
    const { value, name } = evt.target;
    if (value) {
      store.mapError.set(name, validators[name](value));
    }
  };

  return observer(function() {
    return (
      <form
        onClick={e => e.preventDefault()}
        css={css`
          width: 300px;
          padding: 2rem;
          > div {
            margin: 1.5rem 0;
          }
          box-shadow: ${shadows[4]};
        `}
      >
        <h2>Login</h2>

        <Input
          autoFocus
          label="Username"
          name="username"
          autoComplete="username"
          error={store.mapError.get("username")}
          value={store.map.get("username")}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={store.map.get("password")}
          error={store.mapError.get("password")}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <Button
          primary
          raised
          label="Login"
          disabled={!store.isValid}
          onClick={() => store.login()}
        />
      </form>
    );
  });
};
