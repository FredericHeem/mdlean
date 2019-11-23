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
      box-sizing: border-bottom-color;
      nav ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem;
        list-style: none;
      }
    `,
    li: {
      base: css`
        flex-grow: 1;
        text-align: center;
        margin: 4px;
        cursor: pointer;
        transition: 0.2s;
        overflow: hidden;
        :hover {
          color: ${palette.primary.main.light};
          ::after {
            transform: translateX(0%);
          }
        }
        border-radius: 10px 10px 0px 0px;
        ::after {
          transition: 0.1s ease-in-out;
          transform: translateX(-101%);
          left: 0;
          top: 0;
          background-color: ${palette.primary.main};
          content: "";
          margin-top: 0.3rem;
          height: 0.4rem;
          width: 100%;
          display: block;
        }
      `,
      active: css`
        color: ${palette.primary.main};
        ::after {
          background-color: ${palette.primary.main};
          transform: translateX(0%);
        }
      `,
      disabled: css`
        cursor: not-allowed;
        font-style: italic;
        color: ${palette.text.disabled};
        background-color: white;
        :hover {
          color: ${palette.text.disabled};
          background-color: white;
          border: none;
          ::after {
            transform: translateX(-100%);
          }
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

  const Tab = () => (
    <div css={style.base}>
      <nav>
        <ul>{store.tabs.map((tab, key) => TabHeaderItem(tab))}</ul>
      </nav>
      <div>{store.active && jsx(store.active.content)}</div>
    </div>
  );

  return {
    store,
    View: observer(Tab)
  };
};
