/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { observer } from "mobx-react";

export default context => {
  const {
    theme: { palette }
  } = context;

  const Item = ({ item }) => (
    <li>
      <a href={`#${item.id}`}>{item.name}</a>
    </li>
  );

  const SideBar = ({ items }) => {
    return (
      <nav
        css={css`
          position: fixed;
          top: 100px;
          left: 0;
          width: 200px;
          margin-left: 10px;
          height: 25vh;
          min-height: 200px;
          min-width: 150px;
          overflow: auto;
          position: -webkit-sticky;
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);

          ul {
            padding: 0;
            li {
              cursor: pointer;
              margin: 20px 10px;
              list-style: none;

              a {
                margin: 20px 0px;
                width: 100%;
                height: 100%;
                text-transform: uppercase;
                text-decoration-line: none;
                letter-spacing: 0.1em;
                font-weight: bold;
                color: ${palette.text.primary};
                ::after {
                  content: "";
                  display: block;
                  margin-top: 6px;
                  height: 3px;
                  transition: 0.5s ease-in-out;
                  transform: translate(-100%);
                  transform-origin: right;
                }
              }
            }
          }
        `}
      >
        <Global
          styles={items.map(
            ({ id }) => css`
          nav a[href='#${id}']:hover,
          section:hover[id='${id}'] ~ nav a[href='#${id}']{
            color: ${palette.primary.main};
            ::after {
                  background-color: ${palette.primary.main};
                  transform: translate(0%);
                }
          }
        `
          )}
        />
        <ul>
          {items.map(item => (
            <Item key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    );
  };
  return observer(SideBar);
};
