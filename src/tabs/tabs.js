/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {observable} from "mobx";
import styled from "@emotion/styled";
import { observer } from "mobx-react";

export default ({ theme: { shadows, palette } }) => {
    const style = css``;

    const store = observable({
      tabs: [],
      active: null,
      add(tab) {
        const { tabs } = store;
        if (!store.active) {
          store.active = tab;
          tab.enter && tab.enter()
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
      isActive(tab) {
        return tab.name === store.active.name;
      }
    });

    const styles = {
      root: {
        border: `0px solid lightgrey`,
        display: "flex",
        flexDirection: "column"
      },
      header: {
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: 4
      },
      headerItem: {
        base: {
          flex: `0 0 100px`,
          cursor: "pointer",
          padding: 10,
          borderTop: `4px solid white`,
          transition: "background-color 0.5s, border 0.5s, color 0.5s",
          textTransform: "uppercase"
        },
        active: {
          color: palette.primary.main,
          fontWeight: "bold",
          backgroundColor: "white",
          borderTop: `4px solid ${palette.primary.main}`
        },
        disabled: {
          cursor: "normal",
          color: "grey"
        }
      },
      body: {
        minHeight: 100,
        "> div": {
          //animation: `${showTabAnimation} 0.3s`
        }
      }
    };
    const TabRoot = styled("div")(styles.root);
    const TabHeader = styled("div")(styles.header);
    const TabBody = styled("div")(styles.body);
  
    const TabHeaderItem = styled("div")(
      styles.headerItem.base,
      ({ active }) => active && styles.headerItem.active,
      ({ disabled }) => disabled && styles.headerItem.disabled
    );
  
    function createHeaderItem(tab) {
      return (
        <TabHeaderItem
          key={tab.name}
          active={store.isActive(tab)}
          disabled={tab.disabled}
          onClick={() => store.onSelect(tab)}
        >
          {jsx(tab.header)}
        </TabHeaderItem>
      );
    }
  
    function createBody() {
      return store.active && jsx(store.active.content);
    }
    function Tab() {
      return (
        <div css={styles}>
          <TabHeader>
            {store.tabs.map((tab, key) => createHeaderItem(tab))}
          </TabHeader>
          <TabBody>{createBody()}</TabBody>
        </div>
      );
    }
  
    
  return {
    store,
    View: observer(Tab)
  };
};
