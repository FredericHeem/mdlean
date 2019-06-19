import React from "react";
import styled from "@emotion/styled";
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

  const MenuItemView = styled("div")({
    minWidth: 150
  });

  function MenuItem({ menu, navChange }) {
    const Button = button(context);
    return (
      <MenuItemView>
        <Button
          style={{ justifyContent: "flex-start" }}
          label={menu.text}
          ripple
          fullWidth
          onClick={() => navChange(menu)}
        />
      </MenuItemView>
    );
  }

  const MenuView = styled("div")({
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
