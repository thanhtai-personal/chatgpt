import { Button, TextField } from "@material-ui/core";
import Flex from "components/common/Flex";
import { observer, useLocalObservable } from "mobx-react";
import useDepsContainer from "hooks/useDepsContainer";
import { MESSAGE_TYPE, MESSAGE_CONTENT_TYPE } from "stores/ChatGPTStore";
import Text from "components/common/Text";
import { ChatBotIcon, UserIcon } from "assets/icons";

const HomePage = () => {
  const { uiStore, chatGPTStore } = useDepsContainer();
  const state = useLocalObservable(() => ({
    loading: false,
  }));

  return (
    <Flex
      width={`calc(100% - ${uiStore.menuSize + 32}px)`}
      maxHeight={"100vh"}
      ml={`${uiStore.menuSize + 16}px`}
      p={2}
      position={"relative"}
    >
      <Flex
        column
        width={"100%"}
        my={8}
        pb={15}
        style={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {chatGPTStore.messages.map((message, index) => (
          <Flex
            pl={message.type === MESSAGE_TYPE.ASK ? 0 : 10}
            pr={message.type === MESSAGE_TYPE.ASK ? 0 : 10}
            p={1}
            mb={3}
          >
            <Flex
              width={"100%"}
              justifyContent={
                message.type === MESSAGE_TYPE.ASK ? "flex-start" : "flex-end"
              }
            >
              {message.type === MESSAGE_TYPE.ASK && (
                <UserIcon
                  width={40}
                  height={40}
                  style={{ marginRight: "16px" }}
                />
              )}
              <Flex
                borderRadius={"1rem"}
                border={"solid 1px rgba(255,255,255, 0.1)"}
                p={2}
                maxWidth={`calc(100% - 80px)`}
              >
                {message.contentType === MESSAGE_CONTENT_TYPE.TEXT ? (
                  <Text>{message.content}</Text>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  ></div>
                )}
              </Flex>
              {message.type === MESSAGE_TYPE.AWNSER && (
                <ChatBotIcon
                  width={40}
                  height={40}
                  style={{ marginLeft: "16px" }}
                />
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Flex
        width={"100%"}
        bgcolor={"bg"}
        position={"absolute"}
        bottom={0}
        py={4}
        centerY
      >
        <Flex
          width={"100%"}
          p={2}
          borderRadius={"1rem"}
          border={"solid 1px rgba(255,255,255, 0.1)"}
        >
          <TextField
            variant="standard"
            fullWidth
            multiline
            maxRows={10}
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
              },
            }}
          />
        </Flex>
        <Flex ml={3}>
          <Button disabled={state.loading}>Send</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(HomePage);
