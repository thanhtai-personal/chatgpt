import { TextField } from "@material-ui/core";
import Flex from "components/common/Flex";
import { observer } from "mobx-react";
import useDepsContainer from "hooks/useDepsContainer";

const HomePage = () => {
  const { uiStore } = useDepsContainer();

  return (
    <Flex width={"100%"} height={"100%"} ml={uiStore.menuSize / 8} p={1}>
      <Flex width={"100%"}>
        <TextField></TextField>
      </Flex>
    </Flex>
  );
};

export default observer(HomePage);
