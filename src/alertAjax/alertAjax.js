/* @jsxImportSource @emotion/react */
import { get, pipe, switchCase, map, fork, tap } from "rubico";
import { isString, isEmpty, identity, find } from "rubico/x";
import alert from "../alert";

// A component to display Axios errors
const createHttpError = (payload = {}) =>
  pipe([
    () => payload,
    get("response"),
    (response) =>
      fork({
        // Name
        name: pipe([
          () => response,
          get("statusText"),
          switchCase([isEmpty, response, identity]),
        ]),
        // Code
        code: get("status"),
        // Message
        message: pipe([
          () => [
            get("response.data.message"),
            get("response.data"),
            get("message"),
          ],
          map((getter) => getter(payload)),
          find(isString),
        ]),
        // Details
        details: pipe([
          () => response,
          get("data"),
          switchCase([
            isEmpty,
            () => undefined,
            (details) => JSON.stringify(details, null, 4),
          ]),
        ]),
      })(response),
    tap((errorOut) => {
      console.log("createHttpError", errorOut);
    }),
  ])();

export default (context) => {
  const Alert = alert(context);
  return function AlertAjax({ error, ...other }) {
    if (!error) {
      return null;
    }
    return (
      <Alert
        data-alert-error
        severity="error"
        {...other}
        {...createHttpError(error)}
      />
    );
  };
};
