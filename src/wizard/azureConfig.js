/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import button from "../button";
import input from "../input";

export default (context) => {
  const {
    tr,
    emitter,
    theme: { palette },
  } = context;
  const Button = button(context);
  const Input = input(context, {
    cssOverride: css`
      input {
        width: 25rem;
      }
    `,
  });

  const store = observable({
    map: observable.map(),
    errors: {},
    get isDisabled() {
      return store.map.size < 4;
    },
    nextStep: () => {
      emitter.emit("step.select", "Scan");
    },
  });

  return observer(() => (
    <form
      css={css`
        main {
          section {
            box-shadow: none;
            margin: 0;
            padding: 0.6rem 0;
          }
          margin: 1rem 0;
        }
        footer {
          button {
            margin: 1rem;
          }
        }
      `}
    >
      <main>
        <p>
          Please follow the instructions to setup a service principal used by
          Grucloud to scan an Azure infrastructure.{" "}
        </p>
        <h3>Subscription ID</h3>
        <p>
          Retrieve the <em>Subscription ID</em> with the following command:{" "}
          <pre>az account show --query id -otsv</pre>
        </p>
        <Input
          value={store.map.get("subscriptionId")}
          onChange={(e) => {
            store.map.set("subscriptionId", e.target.value);
          }}
          label={tr.t("Subscription Id")}
          error={store.errors.name && store.errors.name[0]}
        />
        <h3>Tenant ID</h3>
        <p>
          Retrieve the <em>tenantId</em> with the following command:{" "}
          <pre>az account show</pre>
        </p>
        <Input
          value={store.map.get("tenantId")}
          onChange={(e) => {
            store.map.set("tenantId", e.target.value);
          }}
          label={tr.t("Tenant Id")}
          error={store.errors.name && store.errors.name[0]}
        />
        <h3>App ID and password</h3>
        <p>
          Retrieve the <em>appId</em> and <em>password</em> by creating a
          service principal called grucloud:
          <pre>az ad sp create-for-rbac -n "grucloud"</pre>
        </p>
        <section>
          <Input
            value={store.map.get("appId")}
            onChange={(e) => {
              store.map.set("appId", e.target.value);
            }}
            label={tr.t("App Id")}
            error={store.errors.name && store.errors.name[0]}
          />
        </section>
        <section>
          <Input
            type="password"
            value={store.map.get("password")}
            onChange={(e) => {
              store.map.set("password", e.target.value);
            }}
            label={tr.t("Password")}
            error={store.errors.name && store.errors.name[0]}
          />
        </section>
      </main>
      <footer>
        <Button
          onClick={() => emitter.emit("step.select", "ProviderSelection")}
        >
          {"\u25c0"} Back
        </Button>
        <Button
          disabled={store.isDisabled}
          raised
          primary
          onClick={() => store.nextStep()}
        >
          Save and Scan
        </Button>
      </footer>
    </form>
  ));
};
