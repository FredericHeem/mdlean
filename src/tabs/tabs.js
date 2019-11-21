/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable } from "mobx";
import { observer } from "mobx-react";

export default ({ theme: { shadows, palette } }) => {
  const store = observable({
    tabs: [],
    active: null,
    add(tab) {
      const { tabs } = store;
      if (!store.active) {
        store.active = tab;
        tab.enter && tab.enter();
      }
      tabs.push(tab);
    },
    onSelect(tab) {
      if (!tab.disabled) {
        if (store.active && store.active.exit) {
          store.active.exit(store.active);
        }
        if (tab.enter) {
          tab.enter(tab);
        }
        store.active = tab;
      }
    },
    isActive: tab => tab.name === store.active.name
  });

  const style = {
    base: css`
      display: flex;
      flex-direction: column;
      nav ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem;
        list-style: none;
        border-bottom: 2px solid ${palette.primary.main};
      }
    `,
    li: {
      base: css`
        padding: 1rem;
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
        transition: 0.5s;
        :hover {
          background-color: ${palette.primary.light};
          color: ${palette.primary.contrastText};
        }
        border-radius: 10px 10px 0px 0px;
      `,
      active: css`
        background-color: ${palette.primary.main};
        color: ${palette.primary.contrastText};
        box-shadow: ${shadows[10]};
      `,
      disabled: css`
        cursor: not-allowed;
        font-style: italic;
        color: ${palette.text.disabled};
        background-color: white;
        :hover {
          color: ${palette.text.disabled};
          background-color: white;
        }
      `
    }
  };

  const TabHeaderItem = tab => (
    <li
      css={[
        style.li.base,
        store.isActive(tab) && style.li.active,
        tab.disabled && style.li.disabled
      ]}
      key={tab.name}
      onClick={() => store.onSelect(tab)}
    >
      {jsx(tab.header)}
    </li>
  );

  const  Tab = () => (
    <div css={style.base}>
      <nav>
        <ul>{store.tabs.map((tab, key) => TabHeaderItem(tab))}</ul>
      </nav>
      <div>{store.active && jsx(store.active.content)}</div>
    </div>
  )

  return {
    store,
    View: observer(Tab)
  };
};
