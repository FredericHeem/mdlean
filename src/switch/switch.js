/** @jsx jsx */
import { jsx, css } from "@emotion/react";

export default ({ theme: { palette } }) => {
  const style = {
    base: css`
      position: relative;
      input {
        width: 4rem;
        height: 2rem;
        background-color: ${palette.grey["400"]};
        border-radius: 5px;
        appearance: none;
        outline: none;
        transition: all 0.5s;
        box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
        ::after {
          content: "";
          background: #ffffff;
          transform: translateX(0%) scale(1.3);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          background-color: ${palette.grey["700"]};
          transition: all 0.5s;
        }
        :checked {
          background-color: ${palette.primary.light};
        }
        :checked::after {
          content: "";
          transform: translateX(100%) scale(1.3);
          background-color: ${palette.primary.main};
        }
      }
    `,
  };

  return function Switch(props) {
    const { id, disabled, label, onChange, ...otherProps } = props;
    return (
      <div css={[style.base, props.styles]}>
        <input
          type="checkbox"
          required="required"
          disabled={disabled}
          id={id}
          onChange={onChange}
          {...otherProps}
        />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  };
};
