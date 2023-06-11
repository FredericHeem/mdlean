/* @jsxImportSource @emotion/react */

import spinner from "./spinner";

export default (context) => {
  const { tr, theme } = context;
  const { palette, shape, shadows } = theme;

  const Spinner = spinner(context);
  return function SpinnerExamples() {
    return (
      <div>
        <h3>{tr.t("Spinner")}</h3>

        <Spinner />
        <Spinner size={30} />
        <Spinner size={40} color={palette.primary.main} />
        <Spinner size={50} color={palette.secondary.main} />
      </div>
    );
  };
};
