/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export default ({ theme: { palette } }) => {
  const style = {
    base: css`
      position: relative;
      min-height: 60px;
      margin: 10px;
      font-size: 1rem;
      input {
        position: absolute;
        border-radius: 4px;
        border: 1px solid ${palette.text.secondary};
        font-size: 16px;
        box-sizing: border-box;
        padding: 26px 10px 4px 10px;
        outline: none;
        width: 100%;
        height: 100%;
        :valid,
        :focus {
          border: 2px solid ${palette.primary.main};
        }
        :valid ~ label,
        :focus ~ label,
        :disabled ~ label {
          bottom: 75%;
          font-size: 0.9rem;
          font-weight: bold;
          color: ${palette.primary.main};
        }
      }

      label {
        bottom: 50%;
        line-height: 0;
        position: absolute;
        pointer-events: none;
        padding: 0px 10px;
        transition: 0.2s ease-in-out;
        color: ${palette.text.secondary};
      }
    `,
    disabled: css`
      > * {
        color: ${palette.text.disabled} !important;
      }
      input {
        border: 2px dashed ${palette.text.disabled};
      }
    `,
    error: css`
      > * {
        color: ${palette.error.main} !important;
      }
      input {
        border: 2px dashed ${palette.error.main} !important;
      }
    `
  };

  return function Input(props) {
    const { id, disabled, label, onChange, error, ...otherProps } = props;
    return (
      <div
        css={[
          style.base,
          disabled && style.disabled,
          error && style.error,
          props.styles
        ]}
      >
        <input
          name=""
          type="text"
          required="required"
          disabled={disabled}
          id={id}
          onChange={onChange}
          {...otherProps}
        />
        {label && <label htmlFor={id}>{label}</label>}
        {/*error && <ErrorView>{error}</ErrorView>*/}
      </div>
    );
  };
};
