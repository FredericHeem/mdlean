/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Component, useState, useEffect } from "react";
import { observer } from "mobx-react";
import "./App.css";
import palette from "./palette";
import navBar from "./examples/navBar";
import sideBar from "./SideBar";

import checkboxExamples from "./checkbox/checkbox.examples";
import switchExamples from "./switch/switch.examples";

import inputExamples from "./input/input.examples";
import buttonExamples from "./button/button.examples";
import drawerExamples from "./drawer/drawer.examples";

import { createMuiTheme } from "@material-ui/core/styles";

const componentlist = [
  {
    name: "Input",
    href: "#input"
  },
  {
    name: "Button",
    href: "#button"
  },
  {
    name: "Checkbox",
    href: "#checkbox"
  },
  {
    name: "Switch",
    href: "#switch"
  }
];

const context = {
  tr: {
    t: v => v
  },
  palette: palette(),
  theme: createMuiTheme({
    palette: {
      primary: { main: "#3f51b5" },
      secondary: { main: "#f50057" }
    },
    themeName: "Peggy went to the market"
  })
};

const NavBar = navBar(context);
const SideBar = sideBar(context);

const CheckboxExamples = checkboxExamples(context);
const SwitchExamples = switchExamples(context);
const InputExamples = inputExamples(context);
const ButtonExamples = buttonExamples(context);
const DrawerExamples = drawerExamples(context);

class App extends Component {
  render() {
    return (
      <div
        css={css`
          section {
            padding: 20px;
            margin: 0 20px 20px 20px;
            box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);
          }
        `}
      >
        <NavBar />
        <div
          css={css`
            margin-top: 20px;
            display: flex;
          `}
        >
          <SideBar items={componentlist} />
          <main>
            <InputExamples />
            <ButtonExamples />
            <CheckboxExamples />
            <SwitchExamples />
            <DrawerExamples />
          </main>
        </div>
      </div>
    );
  }
}

export default observer(App);
