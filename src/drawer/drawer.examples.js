/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import drawer from "./drawer";
import button from "../button";
import menu from "../examples/menu";

export default context => {
  const { tr } = context;

  const store = observable({
    drawerOpen: false,
    toggle() {
      this.drawerOpen = !this.drawerOpen;
    },
    navChange: action(function(menuItem) {
      this.drawerOpen = false;
    })
  });

  const Menu = menu(context);
  const Drawer = drawer(context);
  const Button = button(context);

  return observer(function () {
    return (
      <section id="drawer">
        <h1>{tr.t("Drawer")}</h1>
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
      </section>
    );
  });
};
