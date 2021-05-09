/* @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { red, teal, orange, blue } from "@material-ui/core/colors";

export default ({ tr, theme: { palette, shadows, shape } }) => {
  function CloseIcon({ onClick }) {
    return (
      <span
        css={{
          cursor: "pointer",
          margin: 0,
        }}
        onClick={onClick}
      >
        {"\u2716"}
      </span>
    );
  }

  const toCss = (color) => css`
    border-left: 8px solid ${color[700]};
    color: ${color[700]};
    background-color: ${color[50]};
  `;

  const styles = {
    root: css`
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      margin: 1rem;
      font-weight: 500;
      text-align: center;
      box-shadow: ${shadows[5]};
      border-radius: ${shape.borderRadius}px;
    `,
    error: toCss(red),
    warning: toCss(orange),
    info: toCss(blue),
    success: toCss(teal),
  };

  const severityToStyle = ({ severity, message }) => {
    const style = styles[severity];
    if (!style) {
      throw Error(`invalid severity: '${severity}', message: ${message}`);
    }
    return style;
  };
  const severityToIcon = {
    error: { icon: "\u26A0", backgroundColor: red[100] },
    warning: { icon: "\u26A0", backgroundColor: orange[100] },
    success: { icon: "\u2714", backgroundColor: teal[100] },
    info: { icon: "\u2139", backgroundColor: blue[100] },
  };

  const Alert = ({ name, severity, message, code, onRemove, ...other }) => {
    const style = severityToStyle({ severity, message });
    return (
      <div css={[styles.root, style]} {...other} role="alert">
        <div
          css={css`
            padding: 0 1.5rem;
            font-size: 4rem;
            background-color: ${severityToIcon[severity].backgroundColor};
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div>{severityToIcon[severity].icon}</div>
        </div>
        <div
          css={css`
            padding: 0 1rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
          `}
        >
          {name && (
            <h3>
              {tr.t(name)} {code && `(${code})`}
            </h3>
          )}
          <p>{`${message}`}</p>
          {onRemove && <CloseIcon onClick={onRemove} />}
        </div>
      </div>
    );
  };
  return Alert;
};
