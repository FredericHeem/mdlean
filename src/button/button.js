import React from "react";
import glamorous from "glamorous";
import { elevation, elevationTransition } from "../elevation";

const styleRipple = {
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
      transition: "background-color 0.3s",
      ":before": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        position: "absolute",
        top: "calc(50% - 100%)",
        left: "calc(50% - 100%)",
        width: "200%",
        height: "200%",
        transition: "opacity 250ms linear",
        borderRadius: "50%",
        opacity: 0,
        pointerEvents: "none",
        content: '""'
      },
      ":hover": {
        ":before": {
          opacity: 0.5
        }
      },
      ":active": {
        ":before": {
          opacity: 1
        }
      }
    },
    button: {
      cursor: "pointer"
    },
    a: {},
    flat: {
      borderWidth: 0
    },
    flatPrimary: {
      backgroundColor: palette.textPrimaryOnPrimary,
      color: palette.primary
    },
    flatAccent: {
      backgroundColor: palette.textPrimaryOnAccent,
      color: palette.accent
    },
    raised: {
      boxShadow: elevation(2),
      transition: elevationTransition(),
      ":active": {
        boxShadow: elevation(8)
      }
    },
    raisedPrimary: {
      backgroundColor: palette.primary,
      color: palette.textPrimaryOnPrimary
    },
    raisedAccent: {
      backgroundColor: palette.accent,
      color: palette.textPrimaryOnAccent
    },
    disabled: {
      color: "rgba(0, 0, 0, .26)",
      cursor: "default",
      pointerEvents: "none",
      boxShadow: elevation(0)
    },
    raisedDisabled: {
      backgroundColor: "rgba(0, 0, 0, .12)"
    },
    fullWidth: {
      textAlign: "center",
      width: "100%"
    },
    label: {
      width: "100%"
    },
    icon: {
      padding: "0.4rem"
    }
  };
  const ButtonView = glamorous("button")(styles.root, styles.button);
  const AnchorView = glamorous("a")(styles.root, styles.a);
  const IconView = glamorous('span')(styles.icon);
  const LabelView = glamorous("span")(styles.label);

  return function Button(props) {
    const {
      fullWidth,
      label,
      primary,
      accent,
      raised,
      disabled,
      ripple,
      href,
      icon,
      children,
      ...otherProps
    } = props;
    const TheButton = glamorous(href ? AnchorView : ButtonView)(
      raised ? styles.raised : styles.flat,
      !raised && primary && styles.flatPrimary,
      !raised && accent && styles.flatAccent,
      raised && primary && styles.raisedPrimary,
      raised && accent && styles.raisedAccent,
      ripple && styleRipple,
      disabled && styles.disabled,
      disabled && raised && styles.raisedDisabled,
      fullWidth && styles.fullWidth
    );

    return (
      <TheButton href={href} {...otherProps}>
        {icon && <IconView>{icon}</IconView>}
        {label && <LabelView>{label}</LabelView>} {children}
      </TheButton>
    );
  };
};
