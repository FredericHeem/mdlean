/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Component } from "react";
import { observer } from "mobx-react";
import "./App.css";
import palette from "./palette";
import navBar from "./examples/navBar";
import checkboxExamples from "./checkbox/checkbox.examples";
import switchExamples from "./switch/switch.examples";

import inputExamples from "./input/input.examples";
import buttonExamples from "./button/button.examples";
import drawerExamples from "./drawer/drawer.examples";

import { createMuiTheme } from "@material-ui/core/styles";

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
const CheckboxExamples = checkboxExamples(context);
const SwitchExamples = switchExamples(context)
const InputExamples = inputExamples(context);
const ButtonExamples = buttonExamples(context);
const DrawerExamples = drawerExamples(context);

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <DrawerExamples/>
        <CheckboxExamples/>
        <SwitchExamples/>
        <InputExamples/>
        <ButtonExamples/>
        
      </div>
    );
  }
}

export default observer(App);
