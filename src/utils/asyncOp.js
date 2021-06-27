/** @jsxImportSource @emotion/react */
import { get } from "rubico";
import { isString } from "rubico/x";
import { observable, action, runInAction } from "mobx";
import alert from "../alert";

function createHttpError(payload = {}) {
  const { response = {} } = payload;
  function name() {
    if (isString(response)) {
      return response;
    }
    return response.statusText;
  }
  function message() {
    const { data } = response;
    if (isString(data)) {
      return data;
    }
    if (data && isString(data.message)) {
      return data.message;
    }
    if (payload.message) {
      return payload.message;
    }
  }
  const errorOut = {
    name: name(),
    code: response.status,
    message: message(),
  };
  return errorOut;
}

export default (context) => {
  const Alert = alert(context);
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
          console.log("fetch ");
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
              <Alert
                data-alert-error
                severity="error"
                {...createHttpError(error)}
              />
            );
          } else if (!status) {
            context.alertStack.add(
              <Alert
                data-alert-error
                severity="error"
                message={error.toString()}
              />
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
