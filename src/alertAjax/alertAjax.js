/* @jsxImportSource @emotion/react */
import { get } from "rubico";
import alert from "../alert";

// A component to display Axios errors

export default (context) => {
  const Alert = alert(context);

  return function AlertAjax({ error, ...other }) {
    if (!error) {
      return null;
    }
    if (![401, 403, 422].includes(get(error, "response.status"))) {
      return null;
    }

    const message = get("response.data.error.message", error.message)(error);

    return (
      <Alert data-alert-error severity="error" {...other} message={message} />
    );
  };
};
