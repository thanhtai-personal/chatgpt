import { useMediaQuery, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import AppMenu from "components/AppMenu";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react";
import { AppTheme } from "styles/theme";
import Flex from "./Flex";
import Loading from "./Loading";

const AppLayout = (props: any) => {
  const styles = useStyles();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));

  const { uiStore } = useDepsContainer();

  return (
    <Flex
      overflow="hidden"
      position="relative"
      style={{
        minHeight: "100vh",
      }}
    >
      <AppMenu />
      {props.children}
      {uiStore.isGlobalLoading ? (
        <Flex
          zIndex={999}
          position={"fixed"}
          top={0}
          left={0}
          bottom={0}
          right={0}
          center
          bgcolor={"rgba(0,0,0,0.7)"}
        >
          <Loading />
        </Flex>
      ) : null}
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    bg: {
      position: "absolute",
      width: "100vw",
    },
  })
);

export default observer(AppLayout);
