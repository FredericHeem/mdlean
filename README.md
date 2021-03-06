Lean Material UI - a fit good looking material design component library

See the [live demo](https://fredericheem.github.io/mdlean/) to find out more about these react components.

Here are the main objectives for these react components:

- Components must be optimised for size.
- Components can be imported individually.
- Real-time theming.
- Compatible with `create-react-app` based app, ejection free.
- Webpack config free, no need to install and configure `sass` or `stylus`.

## Installation

    $ npm i --save mdlean

# Components

## Button

```javascript
import React, { Component } from "react";
import button from "mdlean/lib/button";
import theme from "mdlean/lib/theme";

const context = {
  theme: theme(),
};

const Button = button(context);

class App extends Component {
  render() {
    return (
      <div>
        <h3>FlatButton </h3>
        <Button primary ripple raised label="FLAT LABEL" />
        <Button ripple raised accent>
          RIPPLE RAISED ACCENT
        </Button>
      </div>
    );
  }
}
```

A complete runnable example can be found at [![Edit r09GLRDw4](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r09GLRDw4)

## Release a new version

The package [np](https://github.com/sindresorhus/np), which stands for _npm publish_, is a nifty tool which help to release a new version.

Ensure the branch _master_ is up to date:

```sh
git checkout master
git pull
```

Invoke `np` through the _npm_ scripts;

```sh
npm run np
```

## Npm link

When this lib is linked, avoid the [invalid hook call warning](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react) with:

```
npm link
npm link ../myapp/node_modules/react
cd ../myapp
npm link mdlean
```
