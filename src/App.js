import React, { Component } from "react";
import "./App.css";
import button from "./button";

const context = {
  theme: {
    palette: {
      backgroundColor: "#ffffff",
      textPrimary: "#000000",
      textPrimaryOnPrimary: "#000000",
      textPrimaryOnAccent: "#000000",
      primary1: "#00bcd4",
      primary3: "#bdbdbd",
      accent1: "#ff4081",
      accent2: "#ff4081",
      borderColor: "#e0e0e0"
    }
  }
};

const Button = button(context);

class App extends Component {
  render() {
    return (
      <div>
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
          <Button raised primary>RAISED PRIMARY</Button>
          <Button raised accent>RAISED ACCENT</Button>
          <Button raised ripple label="RAISED RIPPLE" />
          <Button raised accent disabled>disabled RAISED ACCENT </Button>
        </p>
        <h3>Primary</h3>
        <p>
          <Button primary>PRIMARY</Button>
          <Button primary raised>PRIMARY RAISED</Button>
          <Button primary ripple raised>primary RIPPLE RAISED</Button>
          <Button primary disabled>
            primary disabled
          </Button>
        </p>
        <h3>Ripple</h3>
        <p>
          <Button ripple raised>RIPPLE RAISED</Button>
          <Button ripple raised primary>RIPPLE RAISED PRIMARY</Button>
          <Button ripple raised accent>RIPPLE RAISED ACCENT</Button>
          <Button ripple raised accent disabled>
            RIPPLE RAISED ACCENT disabled
          </Button>
        </p>
        <h3>Disabled</h3>
        <p>
          <Button disabled>disabled FLAT</Button>
          <Button disabled primary>disabled FLAT PRIMARY</Button>
          <Button disabled accent>disabled FLAT accent</Button>

          <Button disabled raised>disabled raised</Button>
          <Button disabled raised primary>disabled RAISED PRIMARY</Button>
          <Button disabled raised accent>disabled RAISED accent</Button>
        </p>
        <h3>Full Width</h3>
        <p>
          <Button fullWidth raised label="fullwidth raised" />
          <Button fullWidth primary label="fullwidth  primary" />
        </p>
      </div>
    );
  }
}

export default App;
