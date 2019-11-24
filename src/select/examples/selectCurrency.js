/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import select from "../select";

export default context => {

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

  const SelectCurrencies = select(context, {
    items: currencies,
    renderItems: Item,
    cssOveride: css`
      width: 100px;
    `
  });

  return SelectCurrencies;
};
