import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { makeStyles, withStyles, createStyles } from "@material-ui/styles";
import { observer, useLocalStore } from "mobx-react";
import { AppTheme, Colors } from "styles/theme";
import Flex from "./Flex";
import ClearIcon from "@material-ui/icons/Clear";
import { DialogTitle } from "@material-ui/core";
// import { ReactComponent as CloseIcon } from "assets/icons/closeBtn.svg";

const DialogContent = withStyles((theme: AppTheme) => ({
  root: {
    borderTop: "none",
    borderBottom: "none",
  },
}))(MuiDialogContent);

const AppModal: ForwardRefRenderFunction<any, any> = (props: any, ref: any) => {
  const state = useLocalStore(() => ({
    isLoading: false as boolean,
    childrenComponent: () => "" as any,
    childrenProps: {} as any,
    modalProps: {} as any,
    open: false as boolean,
    closeCallback: (() => {}) as Function,
    disabledBackdrop: false,
    disableCloseable: false,
  }));
  const styles = useStyles(props);

  useImperativeHandle(ref, () => ({
    replaceChildren: (childrenComponent: any) => {
      state.childrenComponent = childrenComponent;
    },
    dangerousUpdateState: (key, value) => {
      state[key] = value;
    },
    updateChildrenProps: (props: any) => {
      state.childrenProps = props;
    },
    updateModalProps: (props: any) => {
      state.modalProps = props;
    },
    openModal: () => {
      state.open = true;
    },
    closeModal: () => {
      state.open = false;
    },
    addCloseCallback: (callback) => {
      if (callback) state.closeCallback = callback;
    },
  }));

  return (
    <Dialog
      onClose={(e, reason) => {
        if (state.disabledBackdrop && reason === "backdropClick") {
          return false;
        } else {
          state.open = false;
          state.closeCallback();
          return true;
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={state.open}
      fullWidth
      maxWidth={"xl"}
      transitionDuration={{
        appear: 500,
        enter: 200,
        exit: 300,
      }}
      classes={{
        root: styles.root,
        paper: styles.root,
      }}
      {...state.modalProps}
    >
      {state.modalProps.title && (
        <DialogTitle>{state.modalProps.title}</DialogTitle>
      )}
      <DialogContent
        style={{
          background: Colors.gray900,
        }}
      >
        {!state.disableCloseable && (
          <Flex
            position={"absolute"}
            top={10}
            right={24}
            cursorPointer
            onClick={() => {
              state.open = false;
              state.closeCallback();
            }}
          >
            <ClearIcon style={{ color: "whitesmoke" }} />
          </Flex>
        )}
        {<state.childrenComponent {...state.childrenProps} />}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      borderRadius: "1rem",
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
    },
  })
);

export default observer(forwardRef(AppModal));
