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
  const Item = ({ item }) => (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-around;
        > div {
          margin:0.4rem;
        }
      `}
    >
      <div>{item.code}</div>
      <div
        css={css`
          font-size: 2rem;
        `}
      >
        {item.flag}
      </div>
    </div>
  );
  const countries = [
    { code: "UK", flag: "🇬🇧" },
    { code: "FR", flag: "🇫🇷" }
  ];
  const Select = select(context, { items: countries, renderItems: Item });

  return observer(function() {
    return (
      <section id="select">
        <h1>{tr.t("Select")}</h1>
        
        <Select
          placeHolder="Select a country"
          value={store.selectedItem.flag}
          onSelected={item => {
            store.selectedItem = item;
          }}
        />
      </section>
    );
  });
};
