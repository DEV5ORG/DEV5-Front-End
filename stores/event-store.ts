import { makeObservable } from "mobx";
import { RootStore } from "./root-store";

export class EventStore {
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {});
  }
}
