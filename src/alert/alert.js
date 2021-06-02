/* @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export default ({ tr, colors, theme: { palette, shadows, shape } }) => {
  const { red, teal, orange, blue } = colors;

  const severityMap = {
    error: { icon: "\u26A0", color: red },
    warning: { icon: "\u26A0", color: orange },
    success: { icon: "\u2714", color: teal },
    info: { icon: "\u2139", color: blue },
  };

  const CloseIcon = ({ onClick }) => (
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

  const toCss = (color) =>
    css`
      border-left: 8px solid ${color[700]};
      color: ${color[700]};
      background-color: ${color[50]};
    `;

  const rootStyle = css`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0.5rem;
    font-weight: 500;
    box-shadow: ${shadows[5]};
    border-radius: ${shape.borderRadius}px;
  `;

  const severityToStyle = ({ severity, message }) => {
    const style = severityMap[severity];
    if (!style) {
      throw Error(`invalid severity: '${severity}', message: ${message}`);
    }
    return style;
  };

  const Alert = ({ name, severity, message, code, onRemove, ...other }) => {
    const style = severityToStyle({ severity, message });

    return (
      <div css={[rootStyle, toCss(style.color)]} {...other} role="alert">
        <div
          css={css`
            padding: 0 1.5rem;
            font-size: 3rem;
            background-color: ${style.color[100]};
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div>{style.icon}</div>
        </div>
        <div
          css={css`
            padding: 0 1rem;
            display: flex;
            flex-grow: 1;
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
          <p>{message}</p>
        </div>
        <div
          css={css`
            padding: 0 1.5rem;
            font-size: 3rem;
            min-height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {onRemove && <CloseIcon onClick={onRemove} />}
        </div>
      </div>
    );
  };
  return Alert;
};
