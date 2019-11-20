/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import modal from "./modal";
import button from "../button";
import * as faker from "faker";

export default context => {
  const { tr } = context;

  const store = observable({
    modalOpen: false,
    toggle: () => (store.modalOpen = !store.modalOpen),
    close: () => {
      store.modalOpen = false;
    }
  });

  const Modal = modal(context);
  const Button = button(context);

  const Content = () => (
    <div>
      {Array(10)
        .fill("")
        .map((v, k) => (
          <p>
            {k + 1}. {faker.lorem.paragraph()}
          </p>
        ))}
    </div>
  );

  return observer(function() {
    return (
      <section id="modal">
        <h1>{tr.t("Modal")}</h1>
        <Button label="OPEN MODAL" raised onClick={store.toggle} />
        <Modal
          open={store.modalOpen}
          onClose={() => {
            store.modalOpen = false;
          }}
        >
          <header>Header</header>
          <Content />
          <footer>
            <Button onClick={store.close}>Cancel</Button>
            <Button primary raised onClick={store.close} label="OK"></Button>
          </footer>
        </Modal>
      </section>
    );
  });
};
