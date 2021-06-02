/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

export default (context, { wizardDefs = [] }) => {
  const {
    emitter,
    theme: { palette },
  } = context;

  const store = observable({
    tabs: wizardDefs.map((wizardDef, stepIndex) => ({
      ...wizardDef,
      stepIndex,
    })),
    activeName: wizardDefs[0].name,
    stepIndex: 0,
    get current() {
      return store.stepByName(store.activeName);
    },
    stepByName: (stepName) =>
      store.tabs.find((tabItem) => stepName == tabItem.name),
    isActive: (tab) => tab.stepIndex === store.stepIndex,
    isPast: (tab) => tab.stepIndex < store.stepIndex,
    isNext: (tab) => tab.stepIndex > store.stepIndex,
  });

  emitter.on(
    "step.select",
    action(async (stepName) => {
      const nextWizard = store.stepByName(stepName);
      if (!nextWizard) {
        return;
      }
      if (store.current) {
        const { exit } = store.current;
        exit && exit(store.current);
      }
      store.activeName = nextWizard.name;
      store.stepIndex = nextWizard.stepIndex;
      const { enter } = store.current;
      enter && enter();
    })
  );

  const style = {
    base: css`
      display: flex;
      flex-direction: column;
      > ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0rem;
        list-style: none;
        counter-reset: step;
      }
    `,
    li: {
      base: css`
        flex-grow: 1;
        text-align: center;
        transition: 0.2s ease-in-out;
        overflow: hidden;
        position: relative;
        flex-grow: 0;
        > header {
          padding: 1rem;
          font-weight: bold;
          ::before {
            counter-increment: step;
            content: counter(step) "";
            padding: 0.3rem;
            margin: 1rem;
            width: 1rem;
            height: 1rem;
            color: ${palette.primary.main};
            border: 2px solid ${palette.primary.contrastText};
            background-color: ${palette.primary.contrastText};
            border-radius: 1rem;
          }
        }

        ::after {
          transition: 0.3s ease-in-out;
          transform: translateX(-101%);
          background-color: ${palette.primary.main};
          content: "";
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: absolute;
          z-index: -1;
        }
      `,
      active: css`
        color: ${palette.primary.contrastText};
        clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
        ::after {
          transform: translateX(0%);
        }
      `,
      past: css`
        cursor: not-allowed;
        background-color: ${palette.primary.light};
        color: ${palette.primary.contrastText};
        ::after {
          transform: translateX(101%);
        }
      `,
      next: css`
        cursor: not-allowed;
        color: ${palette.text.disabled};
        background-color: white;
        header {
          ::before {
            color: ${palette.text.disabled};
            counter-increment: step;
            content: counter(step) "";
            border: 2px solid ${palette.text.disabled};
            background-color: ${palette.primary.disabled};
          }
        }
      `,
    },
  };

  const WizardHeaderItem = observer(({ tab }) => (
    <li
      css={[
        style.li.base,
        store.isPast(tab) && style.li.past,
        store.isActive(tab) && style.li.active,
        store.isNext(tab) && style.li.next,
      ]}
      key={tab.name}
    >
      {jsx(tab.header, { store, tab })}
    </li>
  ));

  const Wizard = () => {
    return (
      <div className="wizard" css={style.base}>
        <ul>
          {store.tabs.map((tab) => (
            <WizardHeaderItem key={tab.name} tab={tab} />
          ))}
        </ul>
        <div>
          {store.current &&
            store.current.content &&
            jsx(store.current.content, { store })}
        </div>
        <div>
          {store.current &&
            store.current.footer &&
            jsx(store.current.footer, { store })}
        </div>
      </div>
    );
  };
  return {
    store,
    View: observer(Wizard),
  };
};
