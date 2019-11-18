import React from 'react';
import styled from "@emotion/styled";
import drawer from '../drawer';
//import { browserHistory } from 'react-router';
import {observable, action} from 'mobx';
import { observer } from 'mobx-react';
import menu from './menu';

export default context => {
  const { tr, theme: {palette} } = context;
  const Drawer = drawer(context);
  const Menu = menu(context);

  const store = observable({
    open: false,
    toggle(){
      this.open = !this.open;
    },
    navChange: action(function(menuItem) {
      //browserHistory.push(menuItem.route);
      this.open = false;
    }),
  });

  const ButtonLeftView = styled('button')({
    margin: 10,
    background: 'transparent',
    border: 0,
  });

  function BurgerIcon() {
    return (
      <svg id="burger-icon" version="1.1" viewBox="0 0 32 32" width="40px" height="50px">
        <path
          fill={palette.primary.contrastText}
          d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
        />
      </svg>
    );
  }

  function IconLeft({onLeftIconButtonTouchTap}) {
    return (
      <ButtonLeftView onClick={onLeftIconButtonTouchTap}>
        <BurgerIcon />
      </ButtonLeftView>
    );
  }

  const TitleView = styled('div')({
    fontSize: 34,
    fontWeight: 'bold',
    margin: 10,
  });

  const AppBarView = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText
  });

  function AppBar({ onLeftIconButtonTouchTap }) {
    return (
      <AppBarView>
        <IconLeft onLeftIconButtonTouchTap={onLeftIconButtonTouchTap} />
        <TitleView>{tr.t("Lean Material Design")}</TitleView>
      </AppBarView>
    );
  }
  function NavBar() {
    return (
      <header>
        <AppBar
          onLeftIconButtonTouchTap={() => {
            store.toggle();
          }}
        />
        <Drawer open={store.open} onClose={() => store.toggle()}>
          <Menu navChange={item => store.navChange(item)} />
        </Drawer>
      </header>
    );
  }

  return observer(NavBar);
};
