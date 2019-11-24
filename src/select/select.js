/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable } from "mobx";
import { observer } from "mobx-react";

export default (
  { theme: { shadows, palette } },
  { items = [], renderItems }
) => {
  const store = observable({
    items: items,
    selectedIndex: -1,
    selected: {},
    open: true,
    keyCode: "",
    menuToggle() {
      store.open = !store.open;
    },
    menuOpen() {
      store.open = true;
    },
    menuClose() {
      store.open = false;
    },

    onClickItem(item, onSelected) {
      store.selected = item;
      store.selectedIndex = -1;
      store.open = false;
      onSelected(store.selected);
    },
    isSelected(index) {
      return store.selectedIndex === index;
    },
    onKeyDown(e, onSelected) {
      store.keyCode = e.keyCode;
      switch (e.keyCode) {
        case 40: // Down
          if (store.selectedIndex <= store.items.length) {
            store.selectedIndex++;
          }
          break;
        case 38: // Up
          if (store.selectedIndex > 0) {
            store.selectedIndex--;
          }
          break;
        case 13: // Enter
          if (store.selectedIndex >= 0) {
            store.onClickItem(store.items[store.selectedIndex], onSelected);
          }
          break;
        default:
      }
    }
  });

  const style = {
    base: css`
      position: relative;
      display: inline-block;
      box-shadow: ${shadows[2]};
      :hover {
        box-shadow: ${shadows[4]};
      }
      z-index: 0;
      > div {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        ::after {
          content: "\u25BC";
          line-height: 1.2rem;
          height: 1.2rem;
          width: 1.2rem;
          margin: 0.4rem;
          font-size: 1.2rem;
        }
      }
      ul {
        position: absolute;
        background-color: white;
        width: 100%;
        transition: 0.5s;
        transform: scaleY(0);
        transform-origin: 0 0;
        list-style: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        box-shadow: ${shadows[4]};
        li {
          padding: 10px;
          position: relative;
          box-shadow: ${shadows[1]};
          transition: 0.5s;
          :hover {
            box-shadow: ${shadows[4]};
          }
          :hover::before {
            background-color: ${palette.primary.main};
            width: 5px;
          }
          
          ::before {
            content: "";
            transition: 0.4s;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0px;
          }
        }
      }
    `,
    show: css`
      > div {
        ::after {
          content: "\u2715";
        }
      }
      ul {
        transform: scaleY(1);
      }
    `
  };

  const Item = observer(({ item, onSelected }) => (
    <li
      css={[store.isSelected(item) && style.li.active]}
      key={item.name}
      onClick={() => {store.onClickItem(item, onSelected)}}
    >
      {jsx(renderItems, { store, item })}
    </li>
  ));

  const Select = observer(({ placeHolder, value, onSelected }) => {
    console.log("Select");
    return (
      <div css={[style.base, store.open && style.show]}>
        <div onClick={store.menuToggle}>{value || placeHolder}</div>
        <ul>
          {store.items.map(item => (
            <Item key={item} item={item} onSelected={onSelected}/>
          ))}
        </ul>
      </div>
    );
  });
  return Select;
};
