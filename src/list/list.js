/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { createElement as h } from "react";

export const list = (context, { style } = {}) => {
  const List = ({
    items = [],
    itemRenderer,
    toId = ({ index }) => index,
    ...leftOver
  }) => (
    <div css={style}>
      {items.map((item, index) =>
        h(itemRenderer, {
          "data-id": toId({ index, item }),
          key: toId({ index, item }),
          item,
          ...leftOver,
        })
      )}
    </div>
  );
  return List;
};
