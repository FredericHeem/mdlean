/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Component } from "react";
import { action } from "mobx";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";
import button from "./button";
import drawer from "./drawer";
import palette from "./palette";
import menu from "./examples/menu";
import navBar from "./examples/navBar";
import fbIcon from "./icons/facebook.svg";
import checkboxExamples from "./checkbox/checkbox.examples";
import inputExamples from "./input/input.examples";
import buttonExamples from "./button/button.examples";

import createSwitch from "./switch";
import { createMuiTheme } from "@material-ui/core/styles";

const store = observable({
  drawerOpen: false,
  toggle() {
    this.drawerOpen = !this.drawerOpen;
  },
  navChange: action(function(menuItem) {
    //browserHistory.push(menuItem.route);
    this.drawerOpen = false;
  }),
  map: observable.map()
});

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
const Menu = menu(context);
const Drawer = drawer(context);
const Button = button(context);
const CheckboxExamples = checkboxExamples(context);
const InputExamples = inputExamples(context);
const ButtonExamples = buttonExamples(context);

const Switch = createSwitch(context);

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CheckboxExamples/>
        <InputExamples/>
        <ButtonExamples/>
        <h1>Switch</h1>
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
              store.map.set(evt.target.name, evt.target.value);
            }}
          />
        </form>
        
        <h1>Drawer</h1>
        <Button
          label="OPEN DRAWER"
          raised
          onClick={() => {
            store.drawerOpen = true;
          }}
        />
        <Drawer
          open={store.drawerOpen}
          onClose={() => {
            store.drawerOpen = false;
          }}
        >
          <Menu navChange={item => store.navChange(item)} />
        </Drawer>
      </div>
    );
  }
}

export default observer(App);
