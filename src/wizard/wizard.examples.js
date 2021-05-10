/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observer } from "mobx-react";
import button from "../button";
import wizard from "./wizard";
import * as faker from "faker";

export default (context) => {
  const { tr, emitter } = context;
  const Button = button(context);

  const tabDefs = [
    {
      name: "ProviderSelection",
      header: ({ store }) => <header>Select Cloud Provider</header>,
      content: ({ store }) => (
        <div
          css={css`
            > button {
              margin: 10px;
            }
          `}
        >
          <p>{faker.lorem.paragraph()}</p>
          <Button
            raised
            onClick={() => emitter.emit("tab.select", "Configuration")}
          >
            Select AWS
          </Button>
        </div>
      ),
      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Configuration",
      header: ({ tab }) => <header>Configuration</header>,
      content: ({ store }) => (
        <div>
          <Button raised onClick={() => emitter.emit("tab.select", "Scan")}>
            Save settings
          </Button>
        </div>
      ),
      footer: ({ store }) => (
        <footer>
          {" "}
          <Button
            raised
            onClick={() => emitter.emit("tab.select", "ProviderSelection")}
          >
            Back to provider selection
          </Button>
        </footer>
      ),
      enter: async () => console.log("tab2 enter"),
    },
    {
      name: "Scan",
      header: ({ tab }) => <header>Scan</header>,
      content: ({ store }) => (
        <div>
          <Button
            raised
            onClick={() => emitter.emit("tab.select", "Configuration")}
          >
            Back to Configuration
          </Button>
        </div>
      ),
      enter: async () => console.log("tab2 enter"),
    },
  ];
  const Wizard = wizard(context, { tabDefs });

  return observer(function () {
    return (
      <section id="wizard">
        <h1>{tr.t("Wizard")}</h1>
        <Wizard.View />
      </section>
    );
  });
};
