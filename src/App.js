import React, { Component } from "react";
import "./App.css";
import button from "./button";

const context = {
  theme: {
    palette: {
      backgroundColor: "#ffffff",
      textPrimary: "#000000",
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
        <h3>Flat</h3>
        <p>
          <Button>FLAT</Button>
          <Button primary>FLAT PRIMARY</Button>
          <Button accent>FLAT ACCENT</Button>
        </p>
        <h3>Raised</h3>
        <p>
          <Button raised>RAISED</Button>
          <Button raised primary>RAISED PRIMARY</Button>
          <Button raised accent>RAISED ACCENT</Button>
        </p>
        <h3>Disabled</h3>
        <p>
          <Button disabled>disabled</Button>
          <Button disabled raised>disabled raised</Button>
          <Button disabled raised primary>disabled RAISED PRIMARY</Button>
          <Button disabled raised accent>disabled RAISED accent</Button>
        </p>
      </div>
    );
  }
}

export default App;
