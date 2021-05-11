/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Lifecycle from "../lifecycle";

export default ({ theme }, options = {}) => {
  const { shape, shadows, palette } = theme;
  const NoFileSelected = "No file selected";

  const style = {
    base: css`
      display: inline-block;
      width: 25rem;

      > * {
        margin: 1rem 0;
      }
      input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      .filename-display {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      label {
        border-radius: ${shape.borderRadius}px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 2px dotted;
        box-shadow: ${shadows[2]};
        :hover {
          box-shadow: ${shadows[5]};
        }
      }
    `,
    disabled: css`
      color: ${palette.grey[500]};
      label {
        background-color: ${palette.grey[100]};
        border: 2px ${palette.grey[500]} dotted;
        :hover {
          box-shadow: ${shadows[2]};
        }
        cursor: not-allowed;
      }
    `,
  };

  const didMount = (props, divDom) => {
    const fileSelected = divDom.querySelector(".filename-display");
    fileSelected.innerHTML = NoFileSelected;
    const inputEl = divDom.getElementsByTagName("input")[0];
    inputEl.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        fileSelected.innerHTML = file.name;
        fileSelected.title = file.name;
      } else {
        fileSelected.innerHTML = NoFileSelected;
        fileSelected.title = NoFileSelected;
      }
    });
  };
  return function FileInput(props) {
    const { disabled, component, onChange, ...otherProps } = props;
    return (
      <Lifecycle
        didMount={didMount}
        disabled={disabled}
        css={[
          style.base,
          disabled && style.disabled,
          props.styles,
          options.cssOverride,
        ]}
      >
        <label>
          {component}
          <input
            type="file"
            disabled={disabled}
            onChange={onChange}
            {...otherProps}
          />
        </label>
        <span className="filename-display"></span>
      </Lifecycle>
    );
  };
};
