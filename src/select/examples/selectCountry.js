/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import select from "../select";
import * as faker from "faker";

export default context => {

  const countries = [
    { code: "UK", flag: "🇬🇧" },
    { code: "FR", flag: "🇫🇷" }
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
      width: 200px;
    `
  });

  return SelectCountry;
};
