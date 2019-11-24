/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import selectCountry from "./examples/selectCountry"
import selectCurrency from "./examples/selectCurrency"

export default context => {
  const { tr } = context;
  const store = observable({
    currency: {code: "EUR"},
    country:""
  });

  const SelectCountry = selectCountry(context)
  const SelectCurrencies = selectCurrency(context)

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
