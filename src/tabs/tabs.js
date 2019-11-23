/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export default ({ emitter, theme: { shadows, palette } }, { tabDefs = [] }) => {
  const store = observable({
    tabs: tabDefs,
    activeName: tabDefs[0].name,
    get current() {
      return store.tabByName(store.activeName);
    },
    tabByName: tabName => store.tabs.find(tabItem => tabName == tabItem.name),
    isActive: tab => tab.name === store.activeName
  });

  emitter.on(
    "tab.add",
    action(async tab => {
      tab.enter && tab.enter();
      store.activeName = tab.name;
      store.tabs.push(tab);
    })
  );
  emitter.on(
    "tab.select",
    action(async tabName => {
      const nextTab = store.tabByName(tabName);
      if (!nextTab) {
        return;
      }
      if (store.current) {
        const { exit } = store.current;
        exit && exit(store.current);
      }
      store.activeName = nextTab.name;
      const { enter } = store.current;
      enter && enter();
    })
  );
  emitter.on(
    "tab.remove",
    action(tabName => {
      const tab = store.tabByName(tabName);
      if (!tab) {
        return;
      }
      const newTabs = store.tabs.filter(it => it.name !== tabName)
      const nextTab = newTabs[0];
      emitter.emit("tab.select", nextTab.name)
      store.tabs = newTabs;
    })
  );

  const style = {
    base: css`
      display: flex;
      flex-direction: column;
      ul {
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
        transition: 0.2s ease-in-out;
        overflow: hidden;
        :hover {
          color: ${palette.primary.main.light};
          ::after {
            transform: translateX(0%);
          }
        }
        ::after {
          transition: 0.3s ease-in-out;
          transform: translateX(-101%);
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
            background-color: white;
          }
        }
      `
    }
  };

  const TabHeaderItem = observer(({ tab }) => (
    <li
      css={[
        style.li.base,
        store.isActive(tab) && style.li.active,
        tab.disabled && style.li.disabled
      ]}
      key={tab.name}
      onClick={() => emitter.emit("tab.select", tab.name)}
    >
      {jsx(tab.header, { store, tab })}
    </li>
  ));

  const Tab = () => {
    return (
      <div css={style.base}>
        <ul>
          {store.tabs.map(tab => (
            <TabHeaderItem key={tab.name} tab={tab} />
          ))}
        </ul>
        <div>
          {store.current && store.current.content && jsx(store.current.content, { store })}
        </div>
      </div>
    );
  };
  return {
    store,
    View: observer(Tab)
  };
};
