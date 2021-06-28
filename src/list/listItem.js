/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import button from "../button";

export const listItem = (context, { style } = {}) => {
  const Button = button(context, {
    cssOverride: [
      css`
        width: 100%;
        display: flex;
        align-items: flex-start;
        text-align: start;
        max-width: 600px;
        font-size: 0.8rem;
        flex-direction: column;
        text-transform: none;
      `,
      style,
    ],
  });

  return Button;
};
