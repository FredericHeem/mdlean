/** @jsx jsx */
import { jsx } from "@emotion/core";

export default ({ palette }) => {

  function Drawer({ open, onClose, children }) {
    const tx = open ? 0 : -window.innerWidth;
    const opacity = open ? 0.5 : 0;
    const zIndex = open ? 1 : -1;
    return (
      <div>
        <div
          onClick={() => onClose()}
          css={{
            zIndex: zIndex,
            opacity: `${opacity}`,
            position: "absolute",
            backgroundColor: `${palette.background}`,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            transition: "opacity 0.3s ease-out"
          }}
        />
        <div
          css={{
            transform: `translate(${tx}px, 0px)`,
            zIndex: 2,
            position: "absolute",
            border: `1px solid ${palette.borderColor}`,
            backgroundColor: `${palette.background}`,
            top: 0,
            left: 0,
            height: "100%",
            transition: "transform 0.3s ease-out"
          }}
        >
          {children}
        </div>
      </div>
    );
  }
  return Drawer;
};
