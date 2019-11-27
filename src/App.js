/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Component } from "react";
import { observer } from "mobx-react";
import mitt from "mitt";

import "./App.css";
import palette from "./palette";
import navBar from "./examples/navBar";
import sideBar from "./SideBar";
import formExamples from "./form/form.examples";

import selectExamples from "./select/select.examples";
import helloExamples from "./hello/hello.examples";
import tabsExamples from "./tabs/tabs.examples";
import checkboxExamples from "./checkbox/checkbox.examples";
import switchExamples from "./switch/switch.examples";

import inputExamples from "./input/input.examples";
import buttonExamples from "./button/button.examples";
import drawerExamples from "./drawer/drawer.examples";
import modalExamples from "./modal/modal.examples";
import { bounce } from "./animation";
import { createMuiTheme } from "@material-ui/core/styles";
import { componentlist } from "./componentList";

const context = {
  tr: {
    t: v => v
  },
  emitter: mitt(),
  palette: palette(),
  theme: createMuiTheme({
    palette: {
      primary: { main: "#3f51b5" },
      secondary: { main: "#f50057" }
    },
    themeName: "Peggy"
  })
};
console.log(context.theme);

const NavBar = navBar(context);
const SideBar = sideBar(context);
const FormExamples = formExamples(context);
const TabsExamples = tabsExamples(context);

const ModalExamples = modalExamples(context);

const CheckboxExamples = checkboxExamples(context);
const SwitchExamples = switchExamples(context);
const InputExamples = inputExamples(context);
const ButtonExamples = buttonExamples(context);
const DrawerExamples = drawerExamples(context);
const HelloExamples = helloExamples(context);
const SelectExamples = selectExamples(context);

class App extends Component {
  render() {
    return (
      <div
        css={css`
          display: grid;
          grid-template-columns: 180px 1fr;
          grid-template-rows: 60px 1fr;
          animation: ${bounce} 1s;

          > header {
            grid-row: 1;
            grid-column: 1 / 3;
            z-index: 2;
            position: sticky;
            top: 0;
          }

          main {
            grid-row: 2;
            padding: 10px;
            margin-top: 20px;
            grid-column: 2 / 3;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: ${context.theme.shadows[10]};
            }
          }
          @media (max-width: ${context.theme.breakpoints.values.sm}) {
            nav {
              visibility: hidden;
            }
            main {
              grid-column: 1 / 3;
            }
          }
        `}
      >
        <NavBar />

        <main>
          <InputExamples />
          <FormExamples />
          <SelectExamples />
          <InputExamples />
          <HelloExamples />
          <TabsExamples />
          <ModalExamples />
          <InputExamples />
          <ButtonExamples />
          <CheckboxExamples />
          <SwitchExamples />
          <DrawerExamples />*
          <FormExamples />
          <SideBar items={componentlist()} />
        </main>
      </div>
    );
  }
}

export default observer(App);
