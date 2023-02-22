import { Collapse, useMediaQuery, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react";
import { useHistory, useLocation } from "react-router-dom";
import { MENU_SIZE } from "stores/UIStore";
import { AppTheme } from "styles/theme";
import Flex from "./common/Flex";
import Text from "./common/Text";

const MenuItem = (props: any) => {
  const { item } = props;
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));
  const { uiStore } = useDepsContainer();
  const styles: any = useStyles({
    ...props,
    active: item.isSelected(),
  });

  return (
    <Flex column width="100%">
      <Flex
        className={styles.menuItem}
        position={"relative"}
        width="100%"
        key={item.name}
        py={"20px"}
        cursorPointer
        onClick={() => {
          if (item.onClick) {
            item.onClick();
          } else {
            history.push(item.path);
            uiStore.isShowDrawer = false;
          }
        }}
        bgcolor={item.isSelected() ? "#013065" : undefined}
        px={mdDown || uiStore.menuSize === MENU_SIZE.full ? 2 : undefined}
      >
        <Flex center width={"100%"} height={"100%"} maxWidth={60}>
          {item.icon && item.icon()}
        </Flex>
        {mdDown || uiStore.menuSize === MENU_SIZE.full ? (
          <Text
            style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
            variant="bold"
            mx={2}
          >
            {item.name}
          </Text>
        ) : null}
        {item.isSelected() ? (
          <Flex
            position={"absolute"}
            right={mdDown ? undefined : 0}
            left={!mdDown ? undefined : 0}
            top={0}
            height={"100%"}
            bgcolor="#0278FE"
            width={5}
          ></Flex>
        ) : null}
      </Flex>
      {item.subMenus && (
        <Collapse in={item.isSelected()}>
          <Flex column width={"100%"}>
            {(item.subMenus || []).map((sItem, index) => (
              <MenuItem key={sItem.key} item={sItem} />
            ))}
          </Flex>
        </Collapse>
      )}
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    menuItem: {
      transform: (props: any) =>
        props.active ? "scaleX(1.05) translateX(5%)" : "unset",
      padding: "20px !important",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.1)",
      },
    },
  })
);

export default observer(MenuItem);
