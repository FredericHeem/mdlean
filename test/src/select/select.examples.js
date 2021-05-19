/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import selectCountry from "./examples/selectCountry";
import selectCurrency from "./examples/selectCurrency";

export default (context) => {
  const { tr } = context;
  const store = observable({
    currency: {},
    country: "",
  });

  const SelectCountry = selectCountry(context);
  const SelectCountryDisabled = selectCountry(context);

  const SelectCurrencies = selectCurrency(context);

  return observer(function () {
    return (
      <section id="select">
        <h1>{tr.t("Select")}</h1>
        <h3>SelectCountry </h3>
        <SelectCountry
          placeholder="Select a country"
          value={store.country.flag}
          onSelected={(item) => {
            store.country = item;
          }}
        />
        <h3>SelectCountry disabled </h3>
        <SelectCountryDisabled
          placeholder="Select a country"
          disabled
          value={store.country.flag}
        />
        <h3>SelectCurrencies</h3>
        <SelectCurrencies
          placeholder="Select a currency"
          value={store.currency.code}
          onSelected={(item) => {
            store.currency = item;
          }}
        />
      </section>
    );
  });
};
