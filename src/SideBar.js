/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";

export default context => {
  const {
    theme: { palette }
  } = context;

  const useFindElementScrolled = items => {
    const [active, setActive] = useState(null);
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      var sections = document.querySelectorAll("section");
      const section = [...sections].reverse().find(section => {
        if (top > section.offsetTop - 40) {
          return true;
        }
      });
      if (section) {
        setActive(section.id);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return active;
  };

  const Item = ({ item, active }) => (
    <li
      css={
        item.href.includes(active) &&
        css`
          * {
            color: ${palette.primary.contrastText};
          }
          background-color: ${palette.primary.main};
        `
      }
    >
      <a href={item.href}>{item.name}</a>
    </li>
  );

  const SideBar = ({ items }) => {
    const active = useFindElementScrolled(items);
    return (
      <nav
        css={css`
          width: 200px;
          margin-left:10px;
          height: 25vh; // experiment with this value, try changing to 110vh
          min-height: 200px;
          min-width: 150px;
          overflow: auto;
          position: -webkit-sticky;
          position: sticky;
          top: 5%;
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);

          ul {
            padding: 0;
            li {
              cursor: pointer;
              padding: 10px;
              list-style: none;
              a {
                text-transform: uppercase;
                text-decoration-line: none;
                letter-spacing: 0.2em;
                font-weight:bold;
              }
            }
          }
        `}
      >
        <ul>
          {items.map(item => (
            <Item key={item.name} active={active} item={item} />
          ))}
        </ul>
      </nav>
    );
  };
  return observer(SideBar);
};
