import { action, makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export const MENU_SIZE = {
  mini: 70,
  full: 250,
};

class UIStore extends BaseStore {
  @observable public isGlobalLoading = false;
  @observable public isShowDrawer = true;
  @observable public menuSize = MENU_SIZE.mini;

  constructor(depsContainer: any) {
    super(depsContainer);
    makeObservable(this);
  }
}

export default UIStore;
