/** @jsx jsx */
import { useState } from "react";
import styled from "@emotion/styled";
import { jsx, css, keyframes } from "@emotion/core";

export default ({ theme: { palette } }) => {
  const animation = keyframes({
    "0%": { transform: "scale(0)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 }
  });

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
  const UnderlineView = styled("hr")(styles.underline.root);
  const UnderlineStaticView = styled(UnderlineView)(styles.underline.static);
  const UnderlineFocusView = styled(UnderlineView)(styles.underline.focusOff);
  const UnderlineErrorView = styled(UnderlineView)(styles.underline.errorOff);
  const ErrorView = styled("div")(styles.error);
  return function Input(props) {
    const { id, disabled, label, onChange, error, ...otherProps } = props;
    return (
      <div
        css={css`
          position: relative;
          ${disabled &&
            `> * {
            color: ${palette.text.disabled} !important;
          }`}
        `}
      >
        <input
          name=""
          type="text"
          required="required"
          disabled={disabled}
          css={css`
            position: absolute;
            border: none;
            border: 1px solid ${palette.primary.light};
            font-size: 16px;
            box-sizing: border-box;
            padding: 30px 10px 10px 10px;
            outline: none;
            width: 100%;
            transition: 0.5s;
            :valid,
            :focus {
              border: 2px solid ${palette.primary.main};
            }
            ${disabled && "border: 2px dotted grey;"} :valid ~ label,
            :focus ~ label,
            :disabled ~ label {
              top: 8px;
              font-size: 0.9rem;
              font-weight: bold;
              color: ${palette.primary.main};
            }
          `}
          id={id}
          onChange={onChange}
          {...otherProps}
        />
        {label && (
          <label
            css={css`
              position: absolute;
              top: 20px;
              padding: 0px 10px;
              pointer-events: none;
              transition: 0.5s;
              color: ${palette.text.secondary};
              font-size: 1rem;
              ${disabled && `color: red;`}
            `}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        {error && <ErrorView>{error}</ErrorView>}
      </div>
    );
  };
};
