import { useEffect, useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "styles/theme";
import { observer } from "mobx-react";
import useDepsContainer from "hooks/useDepsContainer";

const ObserverLoadingContainer = (props) => {
  const componentRef: any = useRef(null);
  const styles: any = useStyles(props);
  const { uiStore } = useDepsContainer();

  useEffect(() => {
    if (!uiStore.useAnimation) return () => {};
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (componentRef.current.className === "hidden") {
            componentRef.current.className = props.className || styles.root;
          }
        } else if (!props.once) {
          if (componentRef.current.className !== "hidden") {
            componentRef.current.className = "hidden";
          }
        }
      });
    });
    observer.observe(componentRef.current);
    return () => {
      observer.disconnect();
    };
  }, [props.className]);

  return (
    <div
      style={{ width: "100%" }}
      ref={componentRef}
      className={uiStore.useAnimation ? "hidden" : ""}
    >
      {props.children}
    </div>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      animation: "$init_section 400ms ease-in-out",
    },
    "@keyframes init_section": {
      "0%": {
        opacity: 0,
        transform: "translateY(100px)",
      },
      "100%": {
        opacity: 1,
      },
    },
  })
);

export default observer(ObserverLoadingContainer);
