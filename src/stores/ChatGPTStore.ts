import { action, makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export const MESSAGE_TYPE = {
  ASK: "ASK",
  AWNSER: "AWNSER",
};

export const MESSAGE_CONTENT_TYPE = {
  TEXT: "TEXT",
  HTML: "HTML",
};

export const MENU_SIZE = {
  mini: 70,
  full: 250,
};

export interface Message {
  type: "ASK" | "AWNSER";
  content: string;
  contentType: "TEXT" | "HTML";
}

class ChatGPTStore extends BaseStore {
  @observable public messages = [] as Array<Message>;

  constructor(depsContainer: any) {
    super(depsContainer);
    makeObservable(this);
  }
}

export default ChatGPTStore;
