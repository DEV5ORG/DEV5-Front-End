import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export class EventStore {
  root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }
}
