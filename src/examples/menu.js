import React from "react";
import glamorous from "glamorous";
import button from "../button";

export default context => {

  function menus(authenticated) {
    return [
      {
        route: "/button",
        text: "BUTTON"
      },
      {
        route: "/drawer",
        text: "DRAWER"
      }
    ];
  }

  const MenuItemView = glamorous("div")({
    width: "100%",
    minWidth: 150
  });

  function MenuItem({ menu, navChange }) {
    const Button = button(context);
    return (
      <MenuItemView>
        <Button
          style={{ textAlign: "start" }}
          label={menu.text}
          ripple
          fullWidth
          onClick={() => navChange(menu)}
        />
      </MenuItemView>
    );
  }

  const MenuView = glamorous("div")({
    padding: 0
  });

  function Menu({ navChange }) {
    return (
      <MenuView>
        {menus().map((menu, key) => (
          <MenuItem navChange={navChange} menu={menu} key={key} />
        ))}
      </MenuView>
    );
  }
  return Menu;
};
