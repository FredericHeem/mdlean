/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export default ({ theme: { palette } }) => {
  const style = {
    base: css`
      width: 2rem;
      height: 2rem;
      border-radius: 5px;
      appearance: none;
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      border: 2px solid ${palette.grey["600"]};
      position: relative;
      :hover {
        transform: scale(1.1);
      }
      :disabled {
        border: 2px dashed ${palette.text.disabled};
      }
      :checked {
        border: 2px solid ${palette.primary.main};
        background-color: ${palette.primary.main};
      }
      ::after {
        content: "\u2718";
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.2s;
        color: ${palette.primary.main};
        opacity: 0;
      }
      :checked::after {
        
        color: ${palette.grey["200"]};
        opacity: 1;
      }
    `
  };

  return function Checkbox(props) {
    const { styles, ...otherProps } = props;
    return (
      <input
        css={[style.base, props.styles]}
        type="checkbox"
        required="required"
        {...otherProps}
      />
    );
  };
};
