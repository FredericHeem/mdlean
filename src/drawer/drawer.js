/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

export default ({ theme: { shadows, palette } }) => {
  return function Drawer({ open, onClose, children }) {
    const style = css`
      position: fixed;
      top: 80px;
      left: 0px;
      z-index: 2;
      .overlay {
        position: absolute;
        z-index: ${open ? 1 : -1};
        opacity: ${open ? 0.5 : 0};
        background-color: ${palette.background.default};
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: opacity 0.3s ease-out;
      }
      .content {
        transform: translate(${open ? "0%" : "-100%"}, 0px);
        z-index: 2;
        position: absolute;
        box-shadow: ${shadows[10]};
        background-color: ${palette.background.default};
        top: 0;
        left: 0;
        transition: transform 0.3s ease-out;
      }
    `;

    return (
      <div css={style}>
        <div className="overlay" onClick={() => onClose()} />
        <div className="content">{children}</div>
      </div>
    );
  };
};
