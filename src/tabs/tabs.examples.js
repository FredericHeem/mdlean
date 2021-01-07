/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { observer } from "mobx-react";
import button from "../button";
import createTabs from "./tabs";
import * as faker from "faker";

export default (context) => {
  const { tr, emitter } = context;
  const Button = button(context);

  const createRandomTab = () => ({
    name: faker.lorem.word(),
    header: ({ store, tab }) => <div>{tab.name}</div>,
    content: () => <div>{faker.lorem.paragraph()}</div>,
  });

  const tabDefs = [
    {
      name: "Tab1",
      header: ({ store }) => <div>TAB 1</div>,
      content: ({ store }) => (
        <div
          css={css`
            > button {
              margin: 10px;
            }
          `}
        >
          <Button
            raised
            onClick={() => emitter.emit("tab.add", createRandomTab())}
          >
            Add a new Tab
          </Button>
          <Button
            accent
            onClick={() => emitter.emit("tab.remove", store.activeName)}
          >
            Remove {store.activeName}
          </Button>
          <p>{faker.lorem.paragraph()}</p>
        </div>
      ),
      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Tab2",
      header: ({ tab }) => <div>TAB 2</div>,
      content: ({ store }) => (
        <div>
          <Button onClick={() => emitter.emit("tab.remove", store.activeName)}>
            Remove {store.activeName}
          </Button>
        </div>
      ),
      enter: async () => console.log("tab2 enter"),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      header: ({ store }) => <div>Tab Disabled</div>,
    },
  ];
  const Tabs = createTabs(context, { tabDefs });

  return observer(function () {
    return (
      <section id="tabs">
        <h1>{tr.t("Tabs")}</h1>
        <Tabs.View />
      </section>
    );
  });
};
