/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import select from "./select";
import * as faker from "faker";

export default context => {
  const { tr } = context;
  const store = observable({
    country: "",
    currency: ""
  });

  const countries = [
    { code: "UK", flag: "🇬🇧" },
    { code: "FR", flag: "🇫🇷" }
  ];

  const currencies = [
    { code: "GBP", flag: "🇬🇧" },
    { code: "EUR", flag: "🇪🇺" }
  ];

  const Item = ({ item }) => (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-around;
        > div {
          margin: 0.4rem;
        }
      `}
    >
      <div>{item.code}</div>
      <div
        css={css`
          font-size: 1.8rem;
        `}
      >
        {item.flag}
      </div>
    </div>
  );

  const SelectCountry = select(context, {
    items: countries,
    renderItems: Item,
    cssOveride: css`
      width: 180px;
    `
  });

  store.currency = currencies[0];

  const SelectCurrencies = select(context, {
    items: currencies,
    renderItems: Item
  });

  return observer(function() {
    return (
      <section id="select">
        <h1>{tr.t("Select")}</h1>

        <SelectCountry
          placeHolder="Select a country"
          value={store.country.flag}
          onSelected={item => {
            store.country = item;
          }}
        />
        <SelectCurrencies
          placeHolder="Select a currency"
          value={store.currency.code}
          onSelected={item => {
            store.currency = item;
          }}
        />
      </section>
    );
  });
};
