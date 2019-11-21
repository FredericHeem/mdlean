/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observer } from "mobx-react";
import createTabs from "../tabs";

export default context => {
  const { tr } = context;

  const Tabs = createTabs(context);

  const tabDefs = [
    {
      name: "Tab11", 
      header: () => <div>TAB1</div>,
      content: () => <div>Tab1 Content</div>,
      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit")
    },
    {
      name: "Tab2",
      header: () => <div>TAB2</div>,
      content: () => <div>Tab2 Content</div>,
      enter: async () => console.log("tab2 enter") 
    },
    ,
    {
      name: "Tab Disabled",
      disabled: true,
      header: () => <div>Tab Disabled</div>
    }
  ];
  
  tabDefs.forEach(tabDef => Tabs.store.add(tabDef));
  return observer(function () {
    return (
      <section id="tabs">
        <h1>{tr.t("Tabs")}</h1>
       
        <Tabs.View/>
      </section>
    );
  });
};
