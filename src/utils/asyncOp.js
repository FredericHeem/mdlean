/** @jsxImportSource @emotion/react */
import { get } from "rubico";
import { observable, action, runInAction } from "mobx";
import alertAxios from "../alertAjax";

export default (context) => {
  const AlertAxios = alertAxios(context);
  return function create(api) {
    const store = observable({
      loading: false,
      data: null,
      error: null,

      fetch: action(async function (...input) {
        try {
          runInAction(() => {
            store.loading = true;
            store.error = null;
          });
          const response = await api(...input);
          runInAction(() => {
            store.data = response;
          });
          console.log("fetch response ", response);
          return response;
        } catch (error) {
          //console.error("fetch error ", error);
          runInAction(() => {
            store.error = error;
          });
          const status = get("response.status")(error);

          if (![401, 403, 422].includes(status)) {
            context.alertStack.add(
              <AlertAxios data-alert-error severity="error" error={error} />
            );
          }

          throw error;
        } finally {
          runInAction(() => {
            store.loading = false;
          });
        }
      }),
    });
    return store;
  };
};
