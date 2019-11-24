/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import select from "./select";
import * as faker from "faker";

export default context => {
  const { tr } = context;
  const store = observable({
    selectedItem: ""
  });
  const Item = ({ item }) => <div>{item}</div>;
  const countries = ["UK", "US", "IT"];
  const Select = select(context, { items: countries, renderItems: Item });

  return observer(function() {
    return (
      <section id="select">
        <h1>{tr.t("Select")}</h1>
        <Select
          placeHolder="Select a country"
          value={store.selectedItem}
          onSelected={item => {
            store.selectedItem = item;
          }}
        />
      </section>
    );
  });
};
