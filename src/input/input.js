/** @jsx jsx */
import { useState } from "react";
import styled from "@emotion/styled";
import { jsx, css, keyframes } from "@emotion/core";

export default ({ theme: { palette } }) => {
  const animation = keyframes({
    "0%": { transform: "scale(0)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 }
  });
  /*
  const styles = {
    underline: {
      root: {
        position: "absolute",
        width: "100%",
        margin: 0,
        transition: "all 0.5s ease-in-out",
        border: `1px solid`,
        transform: "scaleX(0)"
      },
      static: {
        borderColor: palette.borderColor,
        animation: `${animation} 1s`,
        transform: "scaleX(1)"
      },
      focusOff: {
        borderColor: palette.primary
      },
      errorOff: {
        borderColor: "red"
      },
      show: {
        transform: "scaleX(1)"
      },
      disabled: {
        border: `1px dotted ${palette.borderColor}`
      }
    },
    error: {
      paddingTop: 6,
      color: "red"
    }
  };

  const ErrorView = styled("div")(styles.error);
*/

  const style = {
    root: {
      base: css`
        position: relative;
        min-height: 80px;
        label {
          position: absolute;
          top: 20px;
          padding: 0px 10px;
          pointer-events: none;
          transition: 0.5s;
          color: ${palette.text.secondary};
          font-size: 1rem;
        }
      `,
      disabled: css`
        > * {
          color: ${palette.text.disabled} !important;
        }
      `,
      error: css`
        > * {
          color: red !important;
        }
      `
    },
    input: {
      base: css`
        position: absolute;
        border: none;
        border: 1px solid ${palette.primary.light};
        font-size: 16px;
        box-sizing: border-box;
        padding: 26px 10px 4px 10px;
        outline: none;
        width: 100%;
        transition: 0.5s;
        :valid,
        :focus {
          border: 2px solid ${palette.primary.main};
        }
        :valid ~ label,
        :focus ~ label,
        :disabled ~ label {
          top: 8px;
          font-size: 0.9rem;
          font-weight: bold;
          color: ${palette.primary.main};
        }
      `,
      disabled: css`
        border: 2px dotted grey;
      `,
      error: css`
        border: 2px solid red !important;
      `
    }
  };
  return function Input(props) {
    const { id, disabled, label, onChange, error, ...otherProps } = props;
    return (
      <div
        css={[
          props.style,
          error && style.root.error,
          disabled && style.root.disabled,
          style.root.base
        ]}
      >
        <input
          name=""
          type="text"
          required="required"
          disabled={disabled}
          css={[style.input.base, error && style.input.error]}
          id={id}
          onChange={onChange}
          {...otherProps}
        />
        {label && (
          <label
            htmlFor={id}
          >
            {label}
          </label>
        )}
        {/*error && <ErrorView>{error}</ErrorView>*/}
      </div>
    );
  };
};
