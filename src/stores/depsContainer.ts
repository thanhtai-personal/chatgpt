import UIStore from "stores/UIStore";

class DepsContainer {
  public uiStore: UIStore;

  public constructor() {
    // Stores
    this.uiStore = new UIStore(this);
  }
}

export default DepsContainer;
