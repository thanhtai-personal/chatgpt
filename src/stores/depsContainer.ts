import UIStore from "stores/UIStore";
import ChatGPTStore from "stores/ChatGPTStore";

class DepsContainer {
  public uiStore: UIStore;
  public chatGPTStore: ChatGPTStore;

  public constructor() {
    // Stores
    this.uiStore = new UIStore(this);
    this.chatGPTStore = new ChatGPTStore(this);
  }
}

export default DepsContainer;
