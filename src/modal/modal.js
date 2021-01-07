/** @jsx jsx */
import { jsx, css } from "@emotion/react";

export default ({ theme: { shadows, palette } }) => {
  return function Modal({ open, onClose, children }) {
    const style = css`
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100vh;
      width: 100vw;
      visibility: ${open ? "visible" : "hidden"};
      .overlay {
        position: absolute;
        z-index: ${open ? 1 : -1};
        opacity: ${open ? 0.8 : 0};
        background-color: ${palette.primary.main};
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: opacity 0.3s ease-out;
      }
      .modal {
        z-index: 2;
        box-shadow: ${shadows[10]};
        background-color: ${palette.background.default};
        top: 0;
        left: 0;
        max-height: 90vh;
        max-width: 95vw;
        transition: transform 0.3s ease-out;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        min-width: 400px;

        header {
          padding: 1rem;
          font-size: 1.8rem;
          font-weight: 800;
          text-align: center;
          background-color: ${palette.primary.main};
          color: ${palette.primary.contrastText};
        }
        footer {
          display: flex;
          justify-content: flex-end;
          margin: 0px;
          box-shadow: ${shadows[2]};
          > * {
            margin: 12px;
          }
        }
        > div {
          margin: 0rem 1rem 0 1rem;
          flex-grow: 1;
          overflow: scroll;
        }
      }
    `;

    return (
      <div css={style}>
        <div className="overlay" onClick={() => onClose()} />
        <div className="modal">{children}</div>
      </div>
    );
  };
};
