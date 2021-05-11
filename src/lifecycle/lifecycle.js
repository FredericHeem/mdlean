import React, { Component } from "react";

export default class Lifecycle extends Component {
  componentDidMount() {
    const { didMount } = this.props;
    didMount && didMount(this.props, this.divDom);
  }
  componentWillUnmount() {
    const { willUnmount } = this.props;
    willUnmount && willUnmount(this.props, this.divDom);
  }
  componentDidUpdate() {
    const { didUpdate } = this.props;
    didUpdate && didUpdate(this.props, this.divDom);
  }
  render() {
    return (
      <div
        className={this.props.className}
        ref={(divDom) => {
          this.divDom = divDom;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
