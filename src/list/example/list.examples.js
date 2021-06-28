/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { list } from "../list";
import { listItem } from "../listItem";

import { PROJECTS } from "./projects";

export default (context) => {
  const { tr } = context;
  const List = list(context, {
    style: css`
      //border: 1px solid red;
      width: 400px;
    `,
  });
  const ListItem = listItem(context, {
    style: css`
      //border: 1px solid red;
    `,
  });

  const store = observable({
    selectedItem: {},
    onSelect: action((item) => {
      store.selectedItem = item;
    }),
  });

  const SelectionItem = observer(({ item, store, ...leftOver }) => (
    <ListItem {...leftOver} onClick={() => store.onSelect(item)} raised>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </ListItem>
  ));

  const ListExamples = observer(() => (
    <section id="list">
      <h1>{tr.t("List")}</h1>
      <form
        css={css`
          > div {
            margin: 10px;
          }
        `}
      >
        <h3>Simple list</h3>
        <div>
          <List
            items={PROJECTS}
            toId={({ item }) => `${item.url}${item.directory}`}
            itemRenderer={SelectionItem}
            store={store}
          />
        </div>
        <div>Selected Item: {store.selectedItem.description}</div>
      </form>
    </section>
  ));
  return ListExamples;
};
