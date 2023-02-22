import { Button, useMediaQuery, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react";
import { useHistory, useLocation } from "react-router-dom";
import { AppTheme, Colors } from "styles/theme";
import Flex from "./common/Flex";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Text from "./common/Text";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SaveIcon from "@material-ui/icons/Save";
interface HeaderProps {
  style?: React.CSSProperties;
}

export const LangKeys = {
  en: "en-EN",
  vi: "vi-VN",
};

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const styles = useStyles(props);
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const { uiStore } = useDepsContainer();

  return (
    <Flex
      width={"100%"}
      bgcolor={"white"}
      minHeight={70}
      justifyContent={"space-between"}
      px={4}
    >
      <Flex centerY>
        <KeyboardBackspaceIcon
          style={{ color: "black", width: 40, height: 40 }}
        />
        <Flex mr={2}>
          <Text ml={1} color={"black"} fontWeight={700} fontSize={24}>
            Order
          </Text>
        </Flex>
        <ArrowForwardIosIcon
          style={{ width: 18, height: 18, color: "black" }}
        />
        <Flex>
          <Text ml={1} color={"black"} fontWeight={400} fontSize={18}>
            Advance Doorwave(#5300)
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Button
          variant="primary"
          style={{ background: "#304FFE", margin: "8px" }}
        >
          <SaveIcon style={{ color: "white", marginRight: "1rem" }} />
          GENERATE CUSTOMER PDF
        </Button>
        <Button
          variant="primary"
          style={{ background: "#198038", margin: "8px" }}
        >
          <SaveIcon style={{ color: "white", marginRight: "1rem" }} />
          SAVE SALES ORDER
        </Button>
      </Flex>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    bg: {},
    menuButton: {},
    menuText: {
      fontFamily: "'Rubik' !important",
      fontStyle: "normal !important",
      fontWeight: "400 !important",
      fontSize: "18px !important",
      lineHeight: "155% !important",
      letterSpacing: "-0.03em !important",
      textTransform: "none",
    },
    select: {
      "&:after": {
        borderBottomColor: "white",
      },
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  })
);

export default observer(Header);
