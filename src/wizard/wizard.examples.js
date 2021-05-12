/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import button from "../button";

import wizard from "./wizard";
import providerSelection from "./providerSelection";

import gcpConfig from "./gcpConfig";
import azureConfig from "./azureConfig";

export default (context) => {
  const { tr, emitter } = context;
  const Button = button(context);
  const ProviderSelection = providerSelection(context);
  const store = observable({
    providerType: "",
    selectProvider: (providerType) => {
      store.providerType = providerType;
      emitter.emit("step.select", "Configuration");
    },
    setProvider: (providerType) => {
      store.providerType = providerType;
    },
  });

  const AwsConfig = () => <div>AWS config</div>;
  const GcpConfig = gcpConfig(context);
  const AzureConfig = azureConfig(context);

  const configViewFromProvider = (providerType) => {
    switch (providerType) {
      case "AWS":
        return <AwsConfig />;
      case "GCP":
        return <GcpConfig />;
      case "Azure":
        return <AzureConfig />;
      default:
        throw Error(`invalid provider type`);
    }
  };
  const wizardDefs = [
    {
      name: "ProviderSelection",
      header: () => <header>{tr.t("Select Provider")}</header>,
      content: () => <ProviderSelection store={store} />,
      enter: async () => {
        store.setProvider("");
      },
      exit: async () => {},
    },
    {
      name: "Configuration",
      header: observer(() => (
        <header>Configuration {store.providerType}</header>
      )),
      content: ({}) => configViewFromProvider(store.providerType),
      enter: async () => console.log("tab2 enter"),
    },
    {
      name: "Scan",
      header: () => <header>Scan</header>,
      content: () => (
        <div>
          <Button
            raised
            onClick={() => emitter.emit("step.select", "Configuration")}
          >
            Back to Configuration
          </Button>
        </div>
      ),
      enter: async () => console.log("tab2 enter"),
    },
  ];
  const Wizard = wizard(context, { wizardDefs });

  // TODO only for testing
  //store.selectProvider("Azure");

  return observer(function () {
    return (
      <section id="wizard">
        <h1>{tr.t("Wizard")}</h1>
        <Wizard.View />
      </section>
    );
  });
};
