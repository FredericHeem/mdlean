/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { observable } from "mobx";
import { observer } from "mobx-react";

export default (
  { theme: { shadows, palette } },
  { items = [], renderItems, cssOveride }
) => {
  const store = observable({
    items: items,
    selectedIndex: -1,
    selected: {},
    open: false,
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
          } else {
            store.open = true;
          }

          break;
        default:
      }
    },
  });

  const style = {
    base: css`
      position: relative;
      display: inline-block;
      transition: 0.3s ease-in-out;
      box-shadow: ${shadows[2]};
      :hover {
        box-shadow: ${shadows[4]};
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        cursor: pointer;
        ::after {
          content: "\u25BE";
          line-height: 1.2rem;
          height: 1.2rem;
          width: 1.2rem;
          margin: 0.4rem;
          font-size: 1.2rem;
        }
        input {
          border: none;
          outline: none;
          font-size: 1.2rem;
          width: 100%;
          cursor: pointer;
          text-overflow: ellipsis;
        }
      }
      ul {
        z-index: 1;
        position: absolute;
        transition: 0.3s ease-in-out;
        transform: scaleY(0);
        transform-origin: 0 0;
        list-style: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        box-shadow: ${shadows[4]};
        max-height: 80vh;
        overflow-y: scroll;
        li {
          position: relative;
          background-color: white;
          box-shadow: ${shadows[1]};
          transition: 0.5s;
          ::before {
            content: "";
            transition: 0.4s;
            position: absolute;
            top: 0;
            left: 0px;
            width: 0px;
            height: 100%;
          }
        }
        li:hover,
        li.selected {
          box-shadow: ${shadows[4]};
          transform: scale(1.05);
        }

        li:hover::before,
        li.selected::before {
          background-color: ${palette.primary.main};
          width: 8px;
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
    `,
  };

  const Item = observer(({ item, index, onSelected }) => (
    <li
      className={store.isSelected(index) ? "selected" : undefined}
      key={item.name}
      onClick={() => {
        store.onClickItem(item, onSelected);
      }}
    >
      {jsx(renderItems, { store, item })}
    </li>
  ));

  const Select = observer(({ placeholder, value, onSelected }) => {
    return (
      <div css={[style.base, store.open && style.show, cssOveride]}>
        <div
          tabIndex={0}
          onKeyDown={(e) => store.onKeyDown(e, onSelected)}
          onClick={store.menuToggle}
        >
          <input disabled value={value} type="text" placeholder={placeholder} />
        </div>
        <ul>
          {store.items.map((item, index) => (
            <Item
              key={index}
              item={item}
              index={index}
              onSelected={onSelected}
            />
          ))}
        </ul>
      </div>
    );
  });
  return Select;
};
