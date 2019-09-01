Lean Material UI - a fit good looking material design component library

See the [live demo](https://fredericheem.github.io/mdlean/) to find out more about these react components.

Here are the main objectives for these react components:
* Components must be optimised for size.
* Components can be imported individually.
* Real-time theming.
* Compatible with `create-react-app` based app, ejection free.
* Webpack config free, no need to install and configure `sass` or `stylus`.


## Installation

    $ npm i --save mdlean

# Components

## Button


```javascript
import React, { Component } from "react";
import button from "mdlean/lib/button";
import theme from 'mdlean/lib/theme';

const context = {
  theme: theme()
};

const Button = button(context);

class App extends Component {
  render() {
    return (
      <div>
        <h3>FlatButton </h3>
        <Button primary ripple raised label="FLAT LABEL" />
        <Button ripple raised accent>RIPPLE RAISED ACCENT</Button>
      </div>
    )
  }
}

```

A complete runnable example can be found at [![Edit r09GLRDw4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r09GLRDw4) [![Greenkeeper badge](https://badges.greenkeeper.io/FredericHeem/mdlean.svg)](https://greenkeeper.io/)






