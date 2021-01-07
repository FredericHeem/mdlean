/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import select from "../select";
import * as faker from "faker";

export default (context) => {
  const currencies = Array(30)
    .fill("")
    .map((v, k) => ({ code: faker.finance.currencyName() }))
    .sort((a, b) => a.code.localeCompare(b.code));
  const Item = ({ item }) => (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 0.9rem;
      `}
    >
      {item.code}
    </div>
  );

  const SelectCurrencies = select(context, {
    items: currencies,
    renderItems: Item,
    cssOveride: css`
      width: 200px;
    `,
  });

  return SelectCurrencies;
};
