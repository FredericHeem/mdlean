/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { observable } from "mobx";
import { observer } from "mobx-react";

export default ({ theme: { palette } }) => {
  const store = observable({
    show: false,
  });

  const style = {
    base: css`
      header {
        background-color: ${palette.primary.main};
        color: ${palette.primary.contrastText};
        cursor: pointer;
        padding: 1rem;
        ::before {
          display: inline-block;
          padding: 0.4rem;
          content: "\u25B6";
          transition: all 0.4s ease-in-out;
        }
      }
      section {
        overflow: hidden;
        transition: max-height 0.4s ease-in-out;
        max-height: 0;
        margin: 1rem;
      }
    `,
    show: css`
      header {
        ::before {
          transform: rotate(90deg);
        }
      }
      section {
      }
    `,
  };

  const Hello = observer(() => {
    return (
      <div
        onClick={() => {
          store.show = !store.show;
        }}
        css={[style.base, store.show && style.show]}
      >
        <header>hello</header>
        <section>world</section>
      </div>
    );
  });
  return Hello;
};
