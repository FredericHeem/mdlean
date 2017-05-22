import React from "react";
import glamorous from "glamorous";

const ripple = {
  position: "relative",
  overflow: "hidden",
  transform: "translate3d(0, 0, 0)",
  ":after": {
    content: '""',
    display: "block",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
    backgroundImage: "radial-gradient(circle, #000 10%, transparent 10%)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    transform: "scale(10,10)",
    opacity: 0,
    transition: "transform .5s, opacity 1s"
  },
  ":active:after": {
    transform: "scale(0,0)",
    opacity: 0.2,
    transition: "0s",
    backgroundColor: "red"
  }
};

export default ({ theme }) => {
  const { palette } = theme;
  const styles = {
    root: {
      color: palette.textPrimary,
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
      padding: "0 0.5rem",
      minWidth: "4rem",
      height: "2.5rem",
      outline: "none",
      border: "none",
      borderRadius: 2,
      background: "transparent",
      fontSize: "1rem",
      fontWeight: 500,
      textAlign: "center",
      textDecoration: "none",
      textTransform: "uppercase",
      overflow: "hidden",
      boxSizing: "border-box",
      userSelect: "none",
      transition: "background-color 0.3s"
    },
    button: {
      cursor: "pointer"
    },
    a: {},
    flat: {
      borderWidth: 0,
      primary: {
        backgroundColor: palette.alternateTextColor,
        color: palette.primary1
      },
      accent: {
        backgroundColor: palette.alternateTextColor,
        color: palette.accent1
      }
    },
    raised: {
      border: `1px solid ${palette.borderColor}`,
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px",
      primary: {
        backgroundColor: palette.primary1,
        color: palette.alternateTextColor
      },
      accent: {
        backgroundColor: palette.accent1,
        color: palette.alternateTextColor
      }
    }
  };
  const ButtonView = glamorous("button")(styles.root, styles.button);
  const AnchorView = glamorous("a")(styles.root, styles.a);

  return function Button(props) {
    const {
      primary,
      accent,
      raised,
      href,
      icon,
      children,
      ...otherProps
    } = props;
    const TheButton = glamorous(href ? AnchorView : ButtonView)(
      raised ? styles.raised : styles.flat,
      !raised && primary && styles.flat.primary,
      !raised && accent && styles.flat.accent,
      raised && primary && styles.raised.primary,
      raised && accent && styles.raised.accent,
      accent && styles.accent,
      ripple
    );

    return (
      <TheButton href={href} {...otherProps}>
        {children}
      </TheButton>
    );
  };
};
