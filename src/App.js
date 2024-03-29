/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Component } from "react";
import { observer } from "mobx-react";
import mitt from "mitt";
import { createBrowserHistory } from "history";

import "./App.css";
import navBar from "./examples/navBar";
import sideBar from "./SideBar";
import formExamples from "./form/form.examples";
import alertStackExamples from "./alertStack/alertStack.examples";

import selectExamples from "./select/select.examples";
import helloExamples from "./hello/hello.examples";
import tabsExamples from "./tabs/tabs.examples";
import checkboxExamples from "./checkbox/checkbox.examples";
import switchExamples from "./switch/switch.examples";
import alertExamples from "./alert/alert.examples";
import listExamples from "./list/example/list.examples";

import inputExamples from "./input/input.examples";
import fileInputExamples from "./fileInput/fileInput.examples";

import buttonExamples from "./button/button.examples";
import drawerExamples from "./drawer/drawer.examples";
import modalExamples from "./modal/modal.examples";
import spinnerExamples from "./spinner/spinner.examples";

import wizardExamples from "./wizard/wizard.examples";

import { bounce } from "./animation";
import { createTheme } from "@mui/material/styles";
import { red, teal, orange, blue } from "@mui/material/colors";
import alertStackCreate from "./alertStack";

import { componentlist } from "./componentList";

const context = {
  tr: {
    t: (v) => v,
  },
  history: createBrowserHistory(),
  emitter: mitt(),
  colors: { red, teal, orange, blue },
  theme: createTheme({
    palette: {
      primary: { main: "#3f51b5" },
      secondary: { main: "#f50057" },
    },
    themeName: "Peggy",
  }),
  config: { apiUrl: "/api/v1/" },
};

context.alertStack = alertStackCreate(context, { limit: 3 });

const NavBar = navBar(context);
const SideBar = sideBar(context);

const AlertExamples = alertExamples(context);
const FormExamples = formExamples(context);
const TabsExamples = tabsExamples(context);
const ListExamples = listExamples(context);
const ModalExamples = modalExamples(context);
const WizardExamples = wizardExamples(context);

const CheckboxExamples = checkboxExamples(context);
const SwitchExamples = switchExamples(context);
const FileInputExamples = fileInputExamples(context);

const InputExamples = inputExamples(context);
const ButtonExamples = buttonExamples(context);
const DrawerExamples = drawerExamples(context);
const HelloExamples = helloExamples(context);
const SelectExamples = selectExamples(context);
const AlertStackExamples = alertStackExamples(context);
const SpinnerExamples = spinnerExamples(context);

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

        <main
          css={css`
            grid-row: 2;
            padding: 10px;
            margin-top: 20px;
            grid-column: 2 / 3;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: ${context.theme.shadows[10]};
            }
          `}
        >
          <AlertExamples />
          <AlertStackExamples />
          <ButtonExamples />
          <CheckboxExamples />
          <DrawerExamples />
          <FormExamples />
          <InputExamples />
          <ListExamples />
          <ModalExamples />
          <FileInputExamples />
          <SelectExamples />
          <SpinnerExamples />
          <SwitchExamples />
          <TabsExamples />
          <WizardExamples />
          {/* Last One */}
          <SideBar items={componentlist()} />
        </main>
      </div>
    );
  }
}

export default observer(App);
