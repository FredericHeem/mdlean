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
import input from "./input";
import { createMuiTheme } from "@material-ui/core/styles";

const store = observable({
  drawerOpen: false,
  toggle() {
    this.drawerOpen = !this.drawerOpen;
  },
  navChange: action(function(menuItem) {
    //browserHistory.push(menuItem.route);
    this.drawerOpen = false;
  })
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
const Input = input(context);
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>Drawer</h1>
        <form
          css={css`
            div {
            }
          `}
        >
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: row;
            `}
          >
            <Input
              label="Input with value"
              styles={css`
                width: 300px;
              `}
              
            />
            <Input
              label="AutoFocus"
              autoFocus
              styles={css`
                width: 200px;
              `}
              onChange={evt => {}}

            />
          </div>
          <Input disabled label="Disabled" />
          <Input disabled label="Disable with value" value="myValue" onChange={evt => {}}/>
          <Input label="3 " />
          <Input label="Error" error="error displayed here" value="abc" onChange={evt => {}}/>
        </form>
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
        <h1>Button</h1>
        <h3>Flat</h3>
        <p>
          <Button label="FLAT LABEL" />
          <Button primary>FLAT PRIMARY</Button>
          <Button accent>FLAT ACCENT</Button>
          <Button ripple label="RIPPLE FLAT" />
          <Button disabled label="disabled FLAT LABEL" />
        </p>
        <h3>Raised</h3>
        <p>
          <Button raised label="RAISED FLAT" />
          <Button raised primary>
            RAISED PRIMARY
          </Button>
          <Button raised accent>
            RAISED ACCENT
          </Button>
          <Button raised ripple label="RAISED RIPPLE" />
          <Button raised accent disabled>
            disabled RAISED ACCENT{" "}
          </Button>
        </p>
        <h3>Primary</h3>
        <p>
          <Button primary>PRIMARY</Button>
          <Button primary raised>
            PRIMARY RAISED
          </Button>
          <Button primary ripple raised>
            primary RIPPLE RAISED
          </Button>
          <Button primary disabled>
            primary disabled
          </Button>
        </p>
        <h3>Ripple</h3>
        <p>
          <Button ripple raised>
            RIPPLE RAISED
          </Button>
          <Button ripple raised primary>
            RIPPLE RAISED PRIMARY
          </Button>
          <Button ripple raised accent>
            RIPPLE RAISED ACCENT
          </Button>
          <Button ripple raised accent disabled>
            RIPPLE RAISED ACCENT disabled
          </Button>
        </p>
        <h3>Disabled</h3>
        <p>
          <Button disabled>disabled FLAT</Button>
          <Button disabled primary>
            disabled FLAT PRIMARY
          </Button>
          <Button disabled accent>
            disabled FLAT accent
          </Button>

          <Button disabled raised>
            disabled raised
          </Button>
          <Button disabled raised primary>
            disabled RAISED PRIMARY
          </Button>
          <Button disabled raised accent>
            disabled RAISED accent
          </Button>
        </p>
        <h3>Full Width</h3>
        <p>
          <Button fullWidth raised label="fullwidth raised" />
          <Button fullWidth primary label="fullwidth  primary" />
        </p>
        <h3>Full Width</h3>
        <p>
          <Button
            raised
            icon={<img src={fbIcon} width="20" alt="fb"/>}
            label="With Icon"
          />
          <Button
            style={{
              width: 350,
              background: "#4267b2",
              color: "white"
            }}
            raised
            icon={
              <img
                style={{ backgroundColor: "white" }}
                src={fbIcon}
                width="20"
                alt="with icon"
              />
            }
            label="With Icon"
          />
          <Button
            raised
            icon={<img src={fbIcon} height="80" alt="with Tall icon"/>}
            label="With Tall Icon"
            
          />
        </p>
      </div>
    );
  }
}

export default observer(App);
