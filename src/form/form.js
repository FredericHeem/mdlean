/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react";

export default () => {
  const Form = observer(({ children }) => (
    <form
      css={css`
        footer {
          button {
            margin: 1rem;
          }
        }
      `}
      onSubmit={(e) => e.preventDefault()}
    >
      {children}
    </form>
  ));
  return Form;
};
