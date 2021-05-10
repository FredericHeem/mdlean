/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export default (context, { tabDefs = [] }) => {
  const {
    emitter,
    theme: { palette },
  } = context;

  const store = observable({
    tabs: tabDefs.map((tabDef, tabindex) => ({ ...tabDef, tabindex })),
    activeName: tabDefs[0].name,
    tabindex: 0,
    get current() {
      return store.tabByName(store.activeName);
    },
    tabByName: (tabName) =>
      store.tabs.find((tabItem) => tabName == tabItem.name),
    isActive: (tab) => tab.tabindex === store.tabindex,
    isPast: (tab) => tab.tabindex < store.tabindex,
    isNext: (tab) => tab.tabindex > store.tabindex,
  });

  emitter.on(
    "tab.select",
    action(async (tabName) => {
      const nextTab = store.tabByName(tabName);
      if (!nextTab) {
        return;
      }
      if (store.current) {
        const { exit } = store.current;
        exit && exit(store.current);
      }
      store.activeName = nextTab.name;
      store.tabindex = nextTab.tabindex;
      const { enter } = store.current;
      enter && enter();
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
        counter-reset: step;
      }
    `,
    li: {
      base: css`
        flex-grow: 1;
        text-align: center;
        transition: 0.2s ease-in-out;
        overflow: hidden;
        position: relative;

        header {
          padding: 1rem;
          font-weight: bold;
          ::before {
            counter-increment: step;
            content: counter(step) "";
            padding: 0.3rem;
            margin: 1rem;
            width: 1rem;
            height: 1rem;
            color: ${palette.primary.main};
            border: 2px solid ${palette.primary.contrastText};
            background-color: ${palette.primary.contrastText};
            border-radius: 1rem;
          }
        }

        ::after {
          transition: 0.3s ease-in-out;
          transform: translateX(-101%);
          background-color: ${palette.primary.main};
          content: "";
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: absolute;
          z-index: -1;
        }
      `,
      active: css`
        color: ${palette.primary.contrastText};
        clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
        ::after {
          transform: translateX(0%);
        }
      `,
      past: css`
        cursor: not-allowed;
        background-color: ${palette.primary.light};
        color: ${palette.primary.contrastText};
        ::after {
          transform: translateX(101%);
        }
      `,
      next: css`
        cursor: not-allowed;
        color: ${palette.text.disabled};
        background-color: white;
        header {
          ::before {
            color: ${palette.text.disabled};
            counter-increment: step;
            content: counter(step) "";
            border: 2px solid ${palette.text.disabled};
            background-color: ${palette.primary.disabled};
          }
        }
      `,
    },
  };

  const TabHeaderItem = observer(({ tab }) => (
    <li
      css={[
        style.li.base,
        store.isPast(tab) && style.li.past,
        store.isActive(tab) && style.li.active,
        store.isNext(tab) && style.li.next,
      ]}
      key={tab.name}
    >
      {jsx(tab.header, { store, tab })}
    </li>
  ));

  const Tab = () => {
    return (
      <div css={style.base}>
        <ul>
          {store.tabs.map((tab) => (
            <TabHeaderItem key={tab.name} tab={tab} />
          ))}
        </ul>
        <div>
          {store.current &&
            store.current.content &&
            jsx(store.current.content, { store })}
        </div>
        <div>
          {store.current &&
            store.current.footer &&
            jsx(store.current.footer, { store })}
        </div>
      </div>
    );
  };
  return {
    store,
    View: observer(Tab),
  };
};
