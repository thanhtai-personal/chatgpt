import { useState } from "react";
import {
  ButtonBase,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react";
import { useHistory, useLocation } from "react-router-dom";
import { AppTheme, Colors } from "styles/theme";
import MenuItem from "./MenuItem";
import OutsideAlerter from "components/common/OutsideAlerter";
import { ChatBotIcon } from "assets/icons";
import { MENU_SIZE } from "stores/UIStore";

interface AppMenuProps {}

const AppMenu = (props: AppMenuProps) => {
  const history = useHistory();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));
  const { uiStore } = useDepsContainer();
  const styles = useStyles({ ...props, menuSize: uiStore.menuSize });

  let MENUS = [
    {
      key: "chat-gpt",
      name: "Chat with GPT",
      icon: () => <ChatBotIcon width={24} height={24} />,
      path: "/chat",
      isSelected: () => {
        return true;
      },
    },
  ];

  return (
    <>
      {mdDown && !uiStore.isShowDrawer ? (
        <Flex
          zIndex={10}
          bgcolor={"#23242E"}
          height="fit-content"
          centerY
          column
          py={2}
          className={styles.rootMobile}
        >
          <ButtonBase
            onClick={() => {
              uiStore.isShowDrawer = true;
            }}
          >
            Menu
          </ButtonBase>
        </Flex>
      ) : null}
      <OutsideAlerter
        showing={(uiStore.isShowDrawer && mdDown) || !mdDown}
        onClick={() => {
          uiStore.isShowDrawer = false;
        }}
      >
        <Flex
          zIndex={10}
          bgcolor={mdDown ? "#23242E" : "drawer"}
          height="100%"
          centerY={uiStore.menuSize === MENU_SIZE.mini}
          column
          py={2}
          className={mdDown ? styles.rootMobile : styles.root}
          onMouseOver={() => {
            if (mdDown) return;
            uiStore.menuSize = MENU_SIZE.full;
          }}
          onMouseOut={() => {
            if (mdDown) return;
            uiStore.menuSize = MENU_SIZE.mini;
          }}
        >
          <Flex
            cursorPointer
            onClick={() => {
              history.push("/");
            }}
            mb={2}
            className={mdDown ? styles.logoMobile : undefined}
          >
            {mdDown ? (
              <Flex width={"100%"} justifyContent={"flex-end"}>
                <ButtonBase
                  onClick={() => {
                    uiStore.isShowDrawer = false;
                  }}
                >
                  close
                </ButtonBase>
              </Flex>
            ) : null}
          </Flex>
          {[MENUS.map((item) => <MenuItem key={item.key} item={item} />)]}
        </Flex>
      </OutsideAlerter>

      {mdDown && uiStore.isShowDrawer ? (
        <Flex
          position={"fixed"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgcolor="rgba(0,0,0,0.4)"
          zIndex={9}
        ></Flex>
      ) : null}
    </>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      position: "fixed",
      left: 0,
      width: (props: any) => props.menuSize,
      borderRight: `1px solid ${Colors.border}`,
      overflow: "hidden",
      overflowY: "auto",
      transitionDuration: "200ms",
      animation: "",
      boxShadow: "inset 3px 0 6px rgba(0,0,0,0.16), 4px 0 6px rgba(0,0,0,0.45)",
    },
    rootMobile: {
      position: "fixed",
      right: 0,
      top: 0,
      bottom: 0,
      borderRight: `1px solid ${Colors.border}`,
      animation: `$expandEffect 200ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes expandEffect": {
      "0%": {
        width: 0,
      },
      "100%": {
        width: MENU_SIZE.full,
      },
    },
    logoMobile: {
      width: "100%",
      padding: "0 8px",
      justifyContent: "space-between",
    },
  })
);

export default observer(AppMenu);
