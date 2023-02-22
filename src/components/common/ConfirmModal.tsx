import { Button, DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import LoadingButton from "@material-ui/lab/LoadingButton";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { makeStyles, withStyles, createStyles } from "@material-ui/styles";
import { Observer, useLocalStore } from "mobx-react";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { AppTheme, Colors } from "styles/theme";
import Flex from "./Flex";
import Text from "./Text";

interface ConfirmModalProps {}

export interface ConfirmModalMessage {
  children: string | (() => React.ReactNode);
  isSuccessErrorAlert?: "SUCCESS" | "ERROR";
  isAlertMessageOnly?: boolean;
  title?: string;
  actionText?: string;
  cancelText?: string;
  actionBtnVariant?: string;
  action?: () => void;
}

const DialogContent = withStyles((theme: AppTheme) => ({
  root: {
    borderTop: "none",
    borderBottom: "none",
  },
}))(MuiDialogContent);

const ConfirmModal: ForwardRefRenderFunction<any, any> = (
  props: ConfirmModalProps,
  ref: any
) => {
  const { t } = useTranslation();
  const state = useLocalStore(() => ({
    isLoading: false,
  }));
  const [messages, setMessages] = useState<ConfirmModalMessage[]>([]);

  useImperativeHandle(ref, () => ({
    addMessage: (msg: ConfirmModalMessage) => {
      setMessages((messages) => {
        return [...messages, msg];
      });
    },
  }));

  const onDismiss = (index: number) => {
    // eslint-disable-next-line prefer-const
    let newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages((messages) => {
      const newMessages = [...messages];
      newMessages.splice(index, 1);
      return newMessages;
    });
  };

  if (messages.length === 0) {
    return <div />;
  }

  const onActionbtnClicked = async (
    index: number,
    msg: ConfirmModalMessage
  ) => {
    const action = msg.action ? msg.action : () => {};
    state.isLoading = true;
    try {
      await action();
      onDismiss(index);
    } catch (err) {
      console.log(err);
    }
    state.isLoading = false;
  };

  return (
    <Fragment>
      {messages.map((item, index) => {
        let title = item.title ? item.title : "INFO";
        const {
          actionBtnVariant,
          isAlertMessageOnly,
          actionText,
          cancelText,
          isSuccessErrorAlert,
        } = item;

        return (
          <Dialog
            key={index}
            onClose={() => {
              onDismiss(index);
            }}
            aria-labelledby="customized-dialog-title"
            open={true}
            fullWidth
            maxWidth={"xs"}
          >
            <DialogContent
              style={{
                background: `linear-gradient(180deg, rgba(55, 136, 210, 1) 0%, rgba(0, 57, 141, 1) 100%)`,
                padding: 0,
              }}
            >
              <Flex
                position={"absolute"}
                top={10}
                right={10}
                cursorPointer
                onClick={() => {
                  onDismiss(index);
                }}
              >
                {"X"}
              </Flex>

              <Flex
                column
                justifyContent={"space-between"}
                centerY
                minHeight={250}
              >
                <Flex width={"100%"} bgcolor={"#244C88"} center py={1}>
                  <Text
                    variant="bold"
                    color="#F7F7F7"
                    style={{ fontSize: 50, textShadow: "1px 1px 15px #2958C3" }}
                  >
                    {title}
                  </Text>
                </Flex>

                <Flex column center width={"100%"} p={2}>
                  {typeof item.children === "string" ? (
                    <Text
                      style={{ fontSize: 25 }}
                      color={
                        isSuccessErrorAlert !== undefined
                          ? isSuccessErrorAlert === "SUCCESS"
                            ? "success"
                            : "error"
                          : undefined
                      }
                      textAlign={"center"}
                    >
                      {item.children}
                    </Text>
                  ) : (
                    item.children()
                  )}

                  <Flex centerY width={"100%"} py={3}>
                    {isAlertMessageOnly ? null : (
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {
                          onDismiss(index);
                        }}
                        style={{ margin: "0 5px" }}
                      >
                        <Text>{cancelText || "NO"}</Text>
                      </Button>
                    )}
                    <Observer>
                      {() => (
                        <LoadingButton
                          fullWidth
                          variant={
                            state.isLoading
                              ? "contained"
                              : actionBtnVariant || "contained"
                          }
                          color="info"
                          onClick={() => {
                            onActionbtnClicked(index, item);
                          }}
                          style={{ margin: "0 5px" }}
                          autoFocus
                          pending={state.isLoading}
                        >
                          <Text>
                            {actionText || (isAlertMessageOnly ? "OK" : "YES")}
                          </Text>
                        </LoadingButton>
                      )}
                    </Observer>
                  </Flex>
                </Flex>
              </Flex>
            </DialogContent>
          </Dialog>
        );
      })}
    </Fragment>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    closeButton: {
      position: "absolute",
      right: -5,
      top: -5,
      color: theme.palette.grey[500],
    },
  })
);

export default forwardRef(ConfirmModal);
